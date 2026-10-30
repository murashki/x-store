import { useCallback } from 'react';
import { useContext } from 'react';
import { useRef } from 'react';

import type { InstanceKey } from './types/InstanceKey.tsx';
import type { ReducerMap } from './types/ReducerMap.tsx';
import type { StateLink } from './types/StateLink.tsx';
import type { StoreRegistry } from './types/StoreRegistry.tsx';
import type { StoreState } from './types/StoreState.tsx';
import type { UsePropSelector } from './types/UsePropSelector.tsx';
import { DEFAULT_INSTANCE_KEY } from './constants.tsx';
import { INITIALIZED_STATE_NAME } from './constants.tsx';
import { INSTANCE_KEY_STATE_NAME } from './constants.tsx';
import { INTERNAL_STORE_PROPS_ACCESSOR } from './constants.tsx';
import { ensureInternalStore } from './ensureInternalStore.tsx';

export function createUsePropSelector(storeRegistry: StoreRegistry): UsePropSelector {
  return function usePropSelector<
    TStoreState extends StoreState = StoreState,
    TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
    TStateName extends keyof TStoreState = keyof TStoreState,
  >(stateLink: StateLink<string, TStoreState, TReducerMap, TStateName>, instanceKey?: InstanceKey): () => TStoreState[TStateName] {
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
      : internalStoreProps.initialState;

    return useCallback((): TStoreState[TStateName] => {
      if (actualStateLink.stateName === INITIALIZED_STATE_NAME) {
        return internalStore.isInitialized(actualInstanceKey) as TStoreState[TStateName];
      }
      else if (actualStateLink.stateName === INSTANCE_KEY_STATE_NAME) {
        return actualInstanceKey as TStoreState[TStateName];
      }
      else if (internalStore.isInitialized(actualInstanceKey)) {
        return internalStore.getState(actualInstanceKey)[actualStateLink.stateName];
      }
      else {
        return uninitializedState[actualStateLink.stateName];
      }
    }, [actualInstanceKey, actualStateLink, internalStore, uninitializedState]);
  };
}
