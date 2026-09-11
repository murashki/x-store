import { useCallback } from 'react';
import { useRef } from 'react';
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/with-selector';

import type { InstanceKey } from './types/InstanceKey.tsx';
import type { ReducerMap } from './types/ReducerMap.tsx';
import type { StateLink } from './types/StateLink.tsx';
import type { StoreRegistry } from './types/StoreRegistry.tsx';
import type { StoreState } from './types/StoreState.tsx';
import type { UsePropAll } from './types/UsePropAll.tsx';
import { INTERNAL_STORE_PROPS_ACCESSOR } from './constants.tsx';
import { ensureInternalStore } from './ensureInternalStore.tsx';

export function createUsePropAll(storeRegistry: StoreRegistry): UsePropAll {
  return function usePropAll<
    TStoreState extends StoreState = StoreState,
    TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
    TStateName extends keyof TStoreState = keyof TStoreState,
  >(stateLink: StateLink<string, TStoreState, TReducerMap, TStateName>, instanceKeys?: InstanceKey[] | ((state: TStoreState) => boolean)): [instanceKey: InstanceKey, state: TStoreState[TStateName]][] {
    const stateLinkRef = useRef<{ stateLink: StateLink<string, TStoreState, TReducerMap, TStateName> }>({ stateLink });

    if (stateLinkRef.current.stateLink !== stateLink) {
      console.warn(`State link reference mismatch. You must pass the same state link on every render.`);
    }

    const actualStateLink = stateLinkRef.current.stateLink;
    const internalStoreProps = actualStateLink[INTERNAL_STORE_PROPS_ACCESSOR];
    const internalStore = ensureInternalStore(storeRegistry, internalStoreProps);

    const subscribe = useCallback((listener: () => void) => {
      return internalStore.subscribeAll(listener);
    }, [internalStore]);

    const getSnapshot = useCallback(() => {
      return internalStore.getStateAll();
    }, [internalStore]);

    const selector = useCallback((stateAll: Record<InstanceKey, TStoreState>) => {
      let actualInstanceKeys: InstanceKey[];
      if (instanceKeys == null) {
        actualInstanceKeys = [...Object.keys(stateAll), ...Object.getOwnPropertySymbols(stateAll)];
      }
      else if (typeof instanceKeys === `function`) {
        actualInstanceKeys = [...Object.keys(stateAll), ...Object.getOwnPropertySymbols(stateAll)].filter((instanceKey) => {
          return instanceKeys(stateAll[instanceKey]);
        });
      }
      else {
        actualInstanceKeys = instanceKeys.filter((instanceKey) => {
          return instanceKey in stateAll;
        });
      }

      return actualInstanceKeys.map((instanceKey): [instanceKey: InstanceKey, state: TStoreState[TStateName]] => {
        return [instanceKey, stateAll[instanceKey][actualStateLink.stateName]];
      });
    }, [actualStateLink, instanceKeys]);

    return useSyncExternalStoreWithSelector(
      subscribe,
      getSnapshot,
      null,
      selector,
      isEqual,
    );
  };
}

function isEqual(prevStateAll: [instanceKey: InstanceKey, state: unknown][], stateAll: [instanceKey: InstanceKey, state: unknown][]) {
  if (prevStateAll.length !== stateAll.length) {
    return false;
  }
  else {
    return prevStateAll.every(([prevInstanceKey, prevState], index) => {
      return prevInstanceKey === stateAll[index][0] && prevState === stateAll[index][1];
    });
  }
}
