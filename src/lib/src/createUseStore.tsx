import { useEffect } from 'react';
import { useMemo } from 'react';
import { useRef } from 'react';

import { type InitPayload } from './types/index.tsx';
import { type InstanceKey } from './types/index.tsx';
import { type InternalStoreProps } from './types/index.tsx';
import { type ReducerMap } from './types/index.tsx';
import { type RegisterDefaultInstance } from './types/index.tsx';
import { type RegisterInstance } from './types/index.tsx';
import { type ResetPayload } from './types/index.tsx';
import { type Store } from './types/index.tsx';
import { type StoreController } from './types/index.tsx';
import { type StoreRegistry } from './types/index.tsx';
import { type StoreState } from './types/index.tsx';
import { DEFAULT_INSTANCE_KEY } from './constants.tsx';
import { INTERNAL_STORE_PROPS_ACCESSOR } from './constants.tsx';
import { STORE_INSTANCE_UNREGISTERED } from './constants.tsx';
import { InternalStore } from './InternalStore.tsx';

type InitInstance = {
  resetInstance: () => typeof STORE_INSTANCE_UNREGISTERED;
};

export function createUseStore(storeRegistry: StoreRegistry) {
  function useStore<
    TStoreState extends StoreState = StoreState,
    TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
    TInitPayload extends InitPayload<TStoreState, TReducerMap> = InitPayload<TStoreState, TReducerMap>,
    TResetPayload extends ResetPayload<TStoreState, TReducerMap> = ResetPayload<TStoreState, TReducerMap>,
  >(
    store: Store<string, TStoreState, TReducerMap>,
    registerInstance: RegisterDefaultInstance<TInitPayload, TResetPayload>,
  ): void;

  function useStore<
    TStoreState extends StoreState = StoreState,
    TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
    TInitPayload extends InitPayload<TStoreState, TReducerMap> = InitPayload<TStoreState, TReducerMap>,
    TResetPayload extends ResetPayload<TStoreState, TReducerMap> = ResetPayload<TStoreState, TReducerMap>,
  >(
    store: Store<string, TStoreState, TReducerMap>,
    instanceKeys: InstanceKey[],
    registerInstance: RegisterInstance<TInitPayload, TResetPayload>,
  ): void;

  function useStore<
    TStoreState extends StoreState = StoreState,
    TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
    TInitPayload extends InitPayload<TStoreState, TReducerMap> = InitPayload<TStoreState, TReducerMap>,
    TResetPayload extends ResetPayload<TStoreState, TReducerMap> = ResetPayload<TStoreState, TReducerMap>,
  >(
    store: Store<string, TStoreState, TReducerMap>,
    ...args: (InstanceKey[] | RegisterInstance<TInitPayload, TResetPayload> | RegisterDefaultInstance<TInitPayload, TResetPayload>)[]
  ): void {
    let instanceKeys: InstanceKey[];
    let registerInstance: RegisterInstance<TInitPayload, TResetPayload> | RegisterDefaultInstance<TInitPayload, TResetPayload>;

    if (typeof args[0] === `function`) {
      instanceKeys = [] as InstanceKey[];
      registerInstance = args[0] as RegisterDefaultInstance<TInitPayload, TResetPayload>;
    }
    else {
      instanceKeys = args[0] as InstanceKey[];
      registerInstance = args[1] as RegisterInstance<TInitPayload, TResetPayload>;
    }

    const actualInstanceKeys = instanceKeys.length ? instanceKeys : [DEFAULT_INSTANCE_KEY];

    const storeRef = useRef<{ store: Store<string, TStoreState, TReducerMap> }>({ store });
    const ownerKeyRef = useRef<{ ownerKey: symbol }>({ ownerKey: Symbol(`ownerKey`) });
    const initInstancesRef = useRef<{ initInstances: Record<InstanceKey, InitInstance> }>({ initInstances: {} });

    useMemo(
      () => {
        const initInstances = initInstancesRef.current.initInstances;
        const store = storeRef.current.store;

        for (const instanceKey of actualInstanceKeys) {
          if ( ! initInstances[instanceKey]) {
            const ownerKey = ownerKeyRef.current.ownerKey;
            const initInstance = (initPayload: TInitPayload) => {
              const internalStoreProps = store[INTERNAL_STORE_PROPS_ACCESSOR] as InternalStoreProps<string, TStoreState, TReducerMap[`$$init`], TReducerMap[`$$reset`]>;

              let storeController = storeRegistry[internalStoreProps.uniqKey] as StoreController<TStoreState, TReducerMap>;
              if ( ! storeController) {
                const internalStore = new InternalStore<TStoreState, TInitPayload, TResetPayload>(internalStoreProps.name);
                storeController = { internalStore, instances: {} };
                storeRegistry[internalStoreProps.uniqKey] = storeController as StoreController;
                // TODO Убрать в логгер
                console.log(`registerStore [store: ${storeController.internalStore.name}]:`);
                console.dir(storeRegistry);
              }

              if ( ! storeController.instances[instanceKey]) {
                const resetState = storeController.internalStore.initInstance(instanceKey, internalStoreProps.initialState, initPayload, internalStoreProps[`$$init`]);
                storeController.instances[instanceKey] = { owners: [], resetState };
              }
              storeController.instances[instanceKey].owners.push(ownerKey);

              return (resetPayload: TResetPayload): typeof STORE_INSTANCE_UNREGISTERED => {
                storeController.instances[instanceKey].owners.splice(storeController.instances[instanceKey].owners.indexOf(ownerKey), 1);

                if (storeController.instances[instanceKey].owners.length === 0) {
                  // TODO Надо ли оповещать слушателей если один экземпляр хранилища удалился
                  storeController.instances[instanceKey].resetState(resetPayload, internalStoreProps[`$$reset`]);
                  delete storeController.instances[instanceKey];
                }

                delete initInstances[instanceKey];

                return STORE_INSTANCE_UNREGISTERED;
              };
            }

            initInstances[instanceKey] = {
              resetInstance: instanceKey === DEFAULT_INSTANCE_KEY
                ? (registerInstance as RegisterDefaultInstance<TInitPayload, TResetPayload>)(initInstance)
                : (registerInstance as RegisterInstance<TInitPayload, TResetPayload>)(initInstance, instanceKey),
            };
          }
        }

        for (const instanceKey in initInstances) {
          if ( ! actualInstanceKeys.includes(instanceKey)) {
            initInstances[instanceKey].resetInstance();
          }
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      actualInstanceKeys,
    );

    useEffect(() => {
      const initInstances = initInstancesRef.current.initInstances;
      return () => {
        for (const instanceKey in initInstances) {
          initInstances[instanceKey].resetInstance();
        }
      };
    }, []);
  }

  return useStore;
}
