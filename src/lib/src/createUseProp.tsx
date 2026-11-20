import { useCallback } from 'react';
import { useContext } from 'react';
import { useRef } from 'react';
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/with-selector';

import type { InstanceKey } from './types/InstanceKey.tsx';
import type { ReducerMap } from './types/ReducerMap.tsx';
import type { StateLink } from './types/StateLink.tsx';
import type { StoreRegistry } from './types/StoreRegistry.tsx';
import type { StoreState } from './types/StoreState.tsx';
import type { UseProp } from './types/UseProp.tsx';
import type { Unlocked } from './types/Unlocked.tsx';
import type { UnlockedState } from './types/UnlockedState.tsx';
import { DEFAULT_INSTANCE_KEY } from './constants.tsx';
import { INITIALIZED_STATE_NAME } from './constants.tsx';
import { INSTANCE_KEY_STATE_NAME } from './constants.tsx';
import { INTERNAL_STORE_PROPS_ACCESSOR } from './constants.tsx';
import { ensureInternalStore } from './ensureInternalStore.tsx';

export function createUseProp(storeRegistry: StoreRegistry): UseProp {
  return function useProp<
    TStoreState extends StoreState = StoreState,
    TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
    TStateName extends keyof TStoreState = keyof TStoreState,
  >(stateLink: StateLink<string, TStoreState, TReducerMap, TStateName>, instanceKey?: InstanceKey): Unlocked<TStoreState[TStateName]> {
    const stateLinkRef = useRef<{ stateLink: StateLink<string, TStoreState, TReducerMap, TStateName> }>({ stateLink });

    if (stateLinkRef.current.stateLink !== stateLink) {
      console.warn(`State link reference mismatch. You must pass the same state link on every render.`);
    }

    const actualStateLink = stateLinkRef.current.stateLink;
    const internalStoreProps = actualStateLink[INTERNAL_STORE_PROPS_ACCESSOR];
    const storeContextValue = useContext(internalStoreProps.context);
    const actualInstanceKey = instanceKey ?? storeContextValue?.instanceKey ?? DEFAULT_INSTANCE_KEY;
    const internalStore = ensureInternalStore(storeRegistry, internalStoreProps);

    const uninitializedState = storeContextValue?.instanceKey === actualInstanceKey
      ? storeContextValue.uninitializedState
      : internalStoreProps.unlockedInitialState;

    const subscribe = useCallback((listener: () => void) => {
      return internalStore.subscribe(actualInstanceKey, listener);
    }, [actualInstanceKey, internalStore]);

    const getSnapshot = useCallback(() => {
      if (internalStore.isInitialized(actualInstanceKey)) {
        return internalStore.getState(actualInstanceKey);
      }
      else {
        return uninitializedState;
      }
    }, [actualInstanceKey, internalStore, uninitializedState]);

    const selector = useCallback((state: UnlockedState<TStoreState>): Unlocked<TStoreState[TStateName]> => {
      if (actualStateLink.stateName === INITIALIZED_STATE_NAME) {
        return internalStore.isInitialized(actualInstanceKey) as Unlocked<TStoreState[TStateName]>;
      }
      else if (actualStateLink.stateName === INSTANCE_KEY_STATE_NAME) {
        return actualInstanceKey as Unlocked<TStoreState[TStateName]>;
      }
      else {
        return state[actualStateLink.stateName];
      }
    }, [actualInstanceKey, actualStateLink, internalStore]);

    return useSyncExternalStoreWithSelector(
      subscribe,
      getSnapshot,
      null,
      selector,
    );
  };
}
