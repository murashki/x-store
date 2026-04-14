import { useCallback } from 'react';
import { useContext } from 'react';
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/with-selector';

import { type InstanceKey } from './types/index.tsx';
import { type InitPayload } from './types/index.tsx';
import { type ReducerMap } from './types/index.tsx';
import { type ResetPayload } from './types/index.tsx';
import { type StateLink } from './types/index.tsx';
import { type StoreRegistry } from './types/index.tsx';
import { type StoreState } from './types/index.tsx';
import { DEFAULT_INSTANCE_KEY } from './constants.tsx';
import { INTERNAL_STORE_PROPS_ACCESSOR } from './constants.tsx';
import { InternalStore } from './InternalStore.tsx';

export function createUseProp(storeRegistry: StoreRegistry) {
  return function useProp<
    TStoreState extends StoreState = StoreState,
    TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
    TStateName extends keyof TStoreState = keyof TStoreState,
  >(
    stateLink: StateLink<string, TStoreState, TReducerMap[`$$init`], TReducerMap[`$$reset`], TStateName>,
    instanceKey?: InstanceKey,
  ): TStoreState[TStateName] {
    const internalStoreProps = stateLink[INTERNAL_STORE_PROPS_ACCESSOR];
    const contextInstanceKey = useContext(internalStoreProps.context);
    const actualInstanceKey = instanceKey ?? contextInstanceKey ?? DEFAULT_INSTANCE_KEY;

    // TODO Вынести в отдельную функцию, т.к. уже встречается в проекте пару раз
    if ( ! (internalStoreProps.uniqKey in storeRegistry)) {
      throw new Error(`Store "${internalStoreProps.name}" is not registered.`);
    }

    // TODO Вынести в отдельную функцию, т.к. уже встречается в проекте пару раз
    if ( ! (storeRegistry[internalStoreProps.uniqKey].instances[actualInstanceKey])) {
      throw new Error(`Store "${internalStoreProps.name}" is not initialized for instance "${String(actualInstanceKey)}".`);
    }

    const internalStore = storeRegistry[internalStoreProps.uniqKey].internalStore as InternalStore<TStoreState, InitPayload<TStoreState, TReducerMap>, ResetPayload<TStoreState, TReducerMap>>;

    const subscribe  = useCallback((listener: () => void) => {
      return internalStore.subscribe(actualInstanceKey, listener);
    }, [actualInstanceKey, internalStore]);

    const getSnapshot = useCallback(() => {
      return internalStore.getSnapshot(actualInstanceKey);
    }, [actualInstanceKey, internalStore]);

    const selector = useCallback((state: TStoreState) => {
      return state[stateLink.stateName];
    }, [stateLink]);

    return useSyncExternalStoreWithSelector(
      subscribe,
      getSnapshot,
      getSnapshot,
      selector,
    );
  };
}
