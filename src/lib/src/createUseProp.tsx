import { useCallback } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/with-selector';

import type { InstanceKey } from './types/InstanceKey.tsx';
import type { ReducerMap } from './types/ReducerMap.tsx';
import type { StateLink } from './types/StateLink.tsx';
import type { StoreRegistry } from './types/StoreRegistry.tsx';
import type { StoreState } from './types/StoreState.tsx';
import type { UseProp } from './types/UseProp.tsx';
import { DEFAULT_INSTANCE_KEY } from './constants.tsx';
import { INTERNAL_STORE_PROPS_ACCESSOR } from './constants.tsx';
import { createStoreController } from './createStoreController.tsx';

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
    const earlySubscriberRef = useRef<{ earlySubscriber: null | (() => void) }>({ earlySubscriber: null });

    const storeController = createStoreController(storeRegistry, internalStoreProps);

    const initialized = actualInstanceKey in storeController.instances;

    const { getSnapshot, subscribe } = useMemo(() => {
      let subscribe: (listener: () => void) => () => void;
      let getSnapshot: () => TStoreState;

      if (initialized) {
        subscribe = (listener: () => void) => {
          return storeController.internalStore.subscribe(actualInstanceKey, listener);
        };

        getSnapshot = () => {
          return storeController.internalStore.getState(actualInstanceKey);
        };
      }
      else {
        subscribe = () => () => undefined;
        getSnapshot = () => internalStoreProps.initialState;
        if ( ! storeController.earlySubscribers[actualInstanceKey]) {
          storeController.earlySubscribers[actualInstanceKey] = [];
        }
        else if (earlySubscriberRef.current.earlySubscriber) {
          storeController.earlySubscribers[actualInstanceKey].splice(storeController.earlySubscribers[actualInstanceKey].indexOf(earlySubscriberRef.current.earlySubscriber), 1);
        }
        const earlySubscriber = earlySubscriberRef.current.earlySubscriber = () => setUninitializedHack(state => state + 1);
        storeController.earlySubscribers[actualInstanceKey].push(earlySubscriber);
      }

      return { getSnapshot, subscribe };
    }, [actualInstanceKey, initialized, internalStoreProps, storeController]);

    const selector = useCallback((state: TStoreState) => {
      return state[stateLink.stateName];
    }, [stateLink]);

    return useSyncExternalStoreWithSelector(
      subscribe,
      getSnapshot,
      null,
      selector,
    );
  };
}
