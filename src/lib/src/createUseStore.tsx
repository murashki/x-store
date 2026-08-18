import { useContext } from 'react';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useRef } from 'react';

import type { InitPayload } from './types/InitPayload.tsx';
import type { InstanceKey } from './types/InstanceKey.tsx';
import type { InternalStoreProps } from './types/InternalStoreProps.tsx';
import type { ReducerMap } from './types/ReducerMap.tsx';
import type { RegisterDefaultInstance } from './types/RegisterDefaultInstance.tsx';
import type { RegisterInstance } from './types/RegisterInstance.tsx';
import type { ResetPayload } from './types/ResetPayload.tsx';
import type { Store } from './types/Store.tsx';
import type { StoreRegistry } from './types/StoreRegistry.tsx';
import type { StoreState } from './types/StoreState.tsx';
import { DEFAULT_INSTANCE_KEY } from './constants.tsx';
import { INTERNAL_STORE_PROPS_ACCESSOR } from './constants.tsx';
import { STORE_INSTANCE_UNREGISTERED } from './constants.tsx';
import { createStoreController } from './createStoreController.tsx';

export function createUseStore(storeRegistry: StoreRegistry) {
  function useStore<
    TStoreState extends StoreState = StoreState,
    TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
    TInitPayload extends InitPayload<TReducerMap> = InitPayload<TReducerMap>,
    TResetPayload extends ResetPayload<TReducerMap> = ResetPayload<TReducerMap>,
  >(
    store: Store<string, TStoreState, TReducerMap>,
    registerInstance: RegisterDefaultInstance<TInitPayload, TResetPayload>,
  ): void;

  function useStore<
    TStoreState extends StoreState = StoreState,
    TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
    TInitPayload extends InitPayload<TReducerMap> = InitPayload<TReducerMap>,
    TResetPayload extends ResetPayload<TReducerMap> = ResetPayload<TReducerMap>,
  >(
    store: Store<string, TStoreState, TReducerMap>,
    instanceKeys: InstanceKey[],
    registerInstance: RegisterInstance<TInitPayload, TResetPayload>,
  ): void;

  function useStore<
    TStoreState extends StoreState = StoreState,
    TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
    TInitPayload extends InitPayload<TReducerMap> = InitPayload<TReducerMap>,
    TResetPayload extends ResetPayload<TReducerMap> = ResetPayload<TReducerMap>,
  >(
    store: Store<string, TStoreState, TReducerMap>,
    ...args: (InstanceKey[] | RegisterInstance<TInitPayload, TResetPayload> | RegisterDefaultInstance<TInitPayload, TResetPayload>)[]
  ): void {
    type InitInstance = {
      resetInstance: () => typeof STORE_INSTANCE_UNREGISTERED;
    };

    const storeRef = useRef<{ store: Store<string, TStoreState, TReducerMap> }>({ store });
    const storeMismatchWarnedRef = useRef<{ warned: boolean }>({ warned: false });

    if (storeRef.current.store !== store) {
      console.warn(`Store reference mismatch. You must pass the same store instance on every render.`);
      storeMismatchWarnedRef.current.warned = true;
    }

    let instanceKeys: InstanceKey[];
    let registerInstance: RegisterInstance<TInitPayload, TResetPayload> | RegisterDefaultInstance<TInitPayload, TResetPayload>;

    const internalStoreProps = storeRef.current.store[INTERNAL_STORE_PROPS_ACCESSOR] as InternalStoreProps<string, TStoreState, TReducerMap>;
    const contextInstanceKey = useContext(internalStoreProps.context);

    if (typeof args[0] === `function`) {
      instanceKeys = [contextInstanceKey ?? DEFAULT_INSTANCE_KEY] as InstanceKey[];
      registerInstance = args[0] as RegisterDefaultInstance<TInitPayload, TResetPayload>;
    }
    else {
      instanceKeys = args[0] as InstanceKey[];
      registerInstance = args[1] as RegisterInstance<TInitPayload, TResetPayload>;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const actualInstanceKeys = useMemo(() => instanceKeys, instanceKeys);
    const ownerKeyRef = useRef<{ ownerKey: symbol }>({ ownerKey: Symbol(`ownerKey`) });
    const initInstancesRef = useRef<{ initInstances: Record<InstanceKey, InitInstance> }>({ initInstances: {} });

    useEffect(
      () => {
        const { ownerKey } = ownerKeyRef.current;
        const { initInstances } = initInstancesRef.current;

        for (const instanceKey of actualInstanceKeys) {
          if ( ! initInstances[instanceKey]) {
            const initInstance = (initPayload: TInitPayload) => {
              const storeController = createStoreController(storeRegistry, internalStoreProps);

              if ( ! storeController.instances[instanceKey]) {
                // TODO Убрать в логгер
                console.log(`Store instance initialization [store: ${storeController.internalStore.name}, instanceKey: ${instanceKey.toString()}]`);
                // TODO Убрать в логгер
                console.log({ storeRegistry });

                const resetState = storeController.internalStore.initInstance(instanceKey, internalStoreProps.initialState, initPayload, internalStoreProps.$$init);
                storeController.instances[instanceKey] = { owners: [], resetState };
                if (storeController.earlySubscribers[instanceKey]) {
                  for (const subscriber of storeController.earlySubscribers[instanceKey]) {
                    subscriber();
                  }
                  storeController.earlySubscribers[instanceKey].splice(0);
                }
              }
              else {
                // TODO Множественная инициализация хранилища
                //   Архитектура позволяет несколько раз инициализировать одно и то же хранилище с
                //   одним и тем же ключом, однако возможно от этого стоит отказаться. Возможно
                //   стоит просить разработчиков проверять инициализирована ли стора и
                //   инициализировать ее при необходимости.
                console.warn(`Duplicate store initialization for key "${instanceKey.toString()}"`);
              }
              storeController.instances[instanceKey].owners.push(ownerKey);

              return (resetPayload: TResetPayload): typeof STORE_INSTANCE_UNREGISTERED => {
                storeController.instances[instanceKey].owners.splice(storeController.instances[instanceKey].owners.indexOf(ownerKey), 1);

                if (storeController.instances[instanceKey].owners.length === 0) {
                  // TODO Надо ли оповещать слушателей если один экземпляр хранилища удалился
                  storeController.instances[instanceKey].resetState(resetPayload, internalStoreProps.$$reset);
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
      [actualInstanceKeys, internalStoreProps, /*registerInstance*/],
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
