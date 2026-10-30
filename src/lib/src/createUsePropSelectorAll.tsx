import { useCallback } from 'react';
import { useRef } from 'react';

import type { InstanceKey } from './types/InstanceKey.tsx';
import type { ReducerMap } from './types/ReducerMap.tsx';
import type { StateLink } from './types/StateLink.tsx';
import type { StoreRegistry } from './types/StoreRegistry.tsx';
import type { StoreState } from './types/StoreState.tsx';
import type { UsePropSelectorAll } from './types/UsePropSelectorAll.tsx';
import { INTERNAL_STORE_PROPS_ACCESSOR } from './constants.tsx';
import { ensureInternalStore } from './ensureInternalStore.tsx';
import { pickPropAll } from './pickPropAll.tsx';

export function createUsePropSelectorAll(storeRegistry: StoreRegistry): UsePropSelectorAll {
  return function usePropSelectorAll<
    TStoreState extends StoreState = StoreState,
    TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
    TStateName extends keyof TStoreState = keyof TStoreState,
  >(stateLink: StateLink<string, TStoreState, TReducerMap, TStateName>, instanceKeys?: InstanceKey[] | ((state: TStoreState) => boolean)): () => [instanceKey: InstanceKey, state: TStoreState[TStateName]][] {
    const stateLinkRef = useRef<{ stateLink: StateLink<string, TStoreState, TReducerMap, TStateName> }>({ stateLink });

    if (stateLinkRef.current.stateLink !== stateLink) {
      console.warn(`State link reference mismatch. You must pass the same state link on every render.`);
    }

    const actualStateLink = stateLinkRef.current.stateLink;
    const internalStoreProps = actualStateLink[INTERNAL_STORE_PROPS_ACCESSOR];
    const internalStore = ensureInternalStore(storeRegistry, internalStoreProps);

    return useCallback(() => {
      return pickPropAll(internalStore.getStateAll(), actualStateLink.stateName, instanceKeys);
    }, [actualStateLink, instanceKeys, internalStore]);
  };
}
