import { useContext } from 'react';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useRef } from 'react';

import type { InstanceKey } from './types/InstanceKey.tsx';
import type { ReducerMap } from './types/ReducerMap.tsx';
import type { RegisterDefaultInstance } from './types/RegisterDefaultInstance.tsx';
import type { RegisterInstance } from './types/RegisterInstance.tsx';
import type { Store } from './types/Store.tsx';
import type { StoreRegistry } from './types/StoreRegistry.tsx';
import type { StoreState } from './types/StoreState.tsx';
import { DEFAULT_INSTANCE_KEY } from './constants.tsx';
import { INTERNAL_STORE_PROPS_ACCESSOR } from './constants.tsx';
import { STORE_INSTANCE_UNREGISTERED } from './constants.tsx';
import { ensureInternalStore } from './ensureInternalStore.tsx';

export function createUseStore(storeRegistry: StoreRegistry) {
  function useStore<
    TStoreState extends StoreState = StoreState,
    TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
  >(
    store: Store<string, TStoreState, TReducerMap>,
    registerInstance: RegisterDefaultInstance<TStoreState>,
  ): void;

  function useStore<
    TStoreState extends StoreState = StoreState,
    TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
  >(
    store: Store<string, TStoreState, TReducerMap>,
    instanceKeys: InstanceKey[],
    registerInstance: RegisterInstance<TStoreState>,
  ): void;

  function useStore<
    TStoreState extends StoreState = StoreState,
    TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
  >(
    store: Store<string, TStoreState, TReducerMap>,
    ...args: (InstanceKey[] | RegisterInstance<TStoreState> | RegisterDefaultInstance<TStoreState>)[]
  ): void {
    type RegisteredInstance = {
      resetInstance: () => typeof STORE_INSTANCE_UNREGISTERED;
    };

    const storeRef = useRef<{ store: Store<string, TStoreState, TReducerMap> }>({ store });

    if (storeRef.current.store !== store) {
      console.warn(`Store reference mismatch. You must pass the same store instance on every render.`);
    }

    let instanceKeys: InstanceKey[];
    let registerInstance: RegisterInstance<TStoreState> | RegisterDefaultInstance<TStoreState>;

    const actualStore = storeRef.current.store;
    const internalStoreProps = actualStore[INTERNAL_STORE_PROPS_ACCESSOR];
    const contextInstanceKey = useContext(internalStoreProps.context)?.instanceKey;

    if (typeof args[0] === `function`) {
      instanceKeys = [contextInstanceKey ?? DEFAULT_INSTANCE_KEY] as InstanceKey[];
      registerInstance = args[0] as RegisterDefaultInstance<TStoreState>;
    }
    else {
      instanceKeys = args[0] as InstanceKey[];
      registerInstance = args[1] as RegisterInstance<TStoreState>;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const actualInstanceKeys = useMemo(() => instanceKeys, instanceKeys);
    const registeredInstancesRef = useRef<{ registeredInstances: Record<InstanceKey, RegisteredInstance> }>({ registeredInstances: Object.create(null) });
    const registerInstanceRef = useRef<{ registerInstance: RegisterInstance<TStoreState> | RegisterDefaultInstance<TStoreState> }>({ registerInstance });
    registerInstanceRef.current.registerInstance = registerInstance;

    useEffect(() => {
      const { registeredInstances } = registeredInstancesRef.current;
      const { registerInstance } = registerInstanceRef.current;

      for (const instanceKey of actualInstanceKeys) {
        if ( ! registeredInstances[instanceKey]) {
          const initInstance = (prefill?: Partial<TStoreState>) => {
            const internalStore = ensureInternalStore(storeRegistry, internalStoreProps);
            const owner = ! internalStore.isInitialized(instanceKey);

            if (owner) {
              // TODO Убрать в логгер
              console.log(`Store instance initialization [store: ${internalStore.name}, instanceKey: ${instanceKey.toString()}]`);
              // TODO Убрать в логгер
              console.log({ storeRegistry });

              internalStore.initInstance(instanceKey, internalStoreProps.$$init, internalStoreProps.initialState, prefill);
            }
            else {
              console.warn(`Store instance is already initialized, initialization skipped [store: ${internalStore.name}, instanceKey: ${instanceKey.toString()}]`);
            }

            return (): typeof STORE_INSTANCE_UNREGISTERED => {
              if (owner) {
                // TODO Убрать в логгер
                console.log(`Store instance resetting [store: ${internalStore.name}, instanceKey: ${instanceKey.toString()}]`);
                // TODO Убрать в логгер
                console.log({ storeRegistry });

                internalStore.resetInstance(instanceKey, internalStoreProps.$$reset);
              }

              delete registeredInstances[instanceKey];

              return STORE_INSTANCE_UNREGISTERED;
            };
          }

          registeredInstances[instanceKey] = {
            resetInstance: instanceKey === DEFAULT_INSTANCE_KEY
              ? (registerInstance as RegisterDefaultInstance<TStoreState>)(initInstance)
              : (registerInstance as RegisterInstance<TStoreState>)(initInstance, instanceKey),
          };
        }
      }

      for (const instanceKey of [...Object.keys(registeredInstances), ...Object.getOwnPropertySymbols(registeredInstances)]) {
        if ( ! actualInstanceKeys.includes(instanceKey)) {
          registeredInstances[instanceKey].resetInstance();
        }
      }
    }, [actualInstanceKeys, internalStoreProps]);

    useEffect(() => {
      const { registeredInstances } = registeredInstancesRef.current;
      return () => {
        for (const instanceKey of [...Object.keys(registeredInstances), ...Object.getOwnPropertySymbols(registeredInstances)]) {
          registeredInstances[instanceKey].resetInstance();
        }
      };
    }, []);
  }

  return useStore;
}
