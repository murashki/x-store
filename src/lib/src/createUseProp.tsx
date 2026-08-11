import { useCallback } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/with-selector';

import type { InstanceKey } from './types/index.tsx';
import type { ReducerMap } from './types/index.tsx';
import type { StateLink } from './types/index.tsx';
import type { StoreRegistry } from './types/index.tsx';
import type { StoreState } from './types/index.tsx';
import type { UseProp } from './types/index.tsx';
import { DEFAULT_INSTANCE_KEY } from './constants.tsx';
import { INTERNAL_STORE_PROPS_ACCESSOR } from './constants.tsx';
import { InternalStore } from './InternalStore.tsx';

export function createUseProp(storeRegistry: StoreRegistry): UseProp {
  return function useProp<
    TStoreState extends StoreState = StoreState,
    TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
    TStateName extends keyof TStoreState = keyof TStoreState,
  >(
    stateLink: StateLink<string, TStoreState, TReducerMap, TStateName>,
    instanceKey?: InstanceKey,
  ): TStoreState[TStateName] {
    const internalStoreProps = stateLink[INTERNAL_STORE_PROPS_ACCESSOR];
    const contextInstanceKey = useContext(internalStoreProps.context);
    const actualInstanceKey = instanceKey ?? contextInstanceKey ?? DEFAULT_INSTANCE_KEY;
    const [, setUninitializedHack] = useState(0);

    const initialized = internalStoreProps.uniqKey in storeRegistry && storeRegistry[internalStoreProps.uniqKey].instances[actualInstanceKey];

    const { getSnapshot, subscribe } = useMemo(() => {
      let subscribe: (listener: () => void) => () => void;
      let getSnapshot: () => TStoreState;

      if (initialized) {
        const internalStore = storeRegistry[internalStoreProps.uniqKey].internalStore as InternalStore<TStoreState, TReducerMap>;

        subscribe = (listener: () => void) => {
          return internalStore.subscribe(actualInstanceKey, listener);
        };

        getSnapshot = () => {
          return internalStore.getState(actualInstanceKey);
        };
      }
      else {
        subscribe = () => () => undefined;
        getSnapshot = () => internalStoreProps.initialState;
      }

      return { getSnapshot, subscribe };
    }, [actualInstanceKey, initialized, internalStoreProps, storeRegistry]);

    const selector = useCallback((state: TStoreState) => {
      return state[stateLink.stateName];
    }, [stateLink]);

    useEffect(() => {
      const initializedAfterEffect = internalStoreProps.uniqKey in storeRegistry && storeRegistry[internalStoreProps.uniqKey].instances[actualInstanceKey];
      if ( ! initialized && initializedAfterEffect) {
        setUninitializedHack(state => state + 1);
      }
    }, [actualInstanceKey, initialized, internalStoreProps, storeRegistry]);

    return useSyncExternalStoreWithSelector(
      subscribe,
      getSnapshot,
      null,
      selector,
    );
  };
}
