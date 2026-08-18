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
import { InternalStore } from './InternalStore.tsx';

export function createUsePropAll(storeRegistry: StoreRegistry): UsePropAll {
  return function usePropAll<
    TStoreState extends StoreState = StoreState,
    TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
    TStateName extends keyof TStoreState = keyof TStoreState,
  >(
    stateLink: StateLink<string, TStoreState, TReducerMap, TStateName>,
    instanceKeys?: InstanceKey[] | ((state: TStoreState) => boolean),
  ): [instanceKey: InstanceKey, state: TStoreState[TStateName]][] {
    const internalStoreProps = stateLink[INTERNAL_STORE_PROPS_ACCESSOR];
    const prevStateAllRef = useRef<{ prevStateAll: [instanceKey: InstanceKey, state: TStoreState[TStateName]][] }>({ prevStateAll: [] });

    if ( ! (internalStoreProps.uniqKey in storeRegistry)) {
      throw new Error(`Store "${internalStoreProps.name}" is not registered.`);
    }

    const internalStore = storeRegistry[internalStoreProps.uniqKey].internalStore as InternalStore<TStoreState, TReducerMap>;

    const subscribe  = useCallback((listener: () => void) => {
      return internalStore.subscribeAll(listener);
    }, [internalStore]);

    const getSnapshot = useCallback(() => {
      return internalStore.getStateAll();
    }, [internalStore]);

    const selector = useCallback((state: Record<string | symbol, TStoreState>) => {
      let stateAll: [instanceKey: InstanceKey, state: TStoreState[TStateName]][];
      if (instanceKeys == null) {
        stateAll = Object.entries(state)
          .map(([instanceKey, state]) => {
            return [instanceKey, state[stateLink.stateName]];
          });
      }
      else if (typeof instanceKeys === `function`) {
        stateAll = Object.entries(state)
          .filter(([_instanceKey, state]) => {
            return instanceKeys(state);
          })
          .map(([instanceKey, state]) => {
            return [instanceKey, state[stateLink.stateName]];
          });
      }
      else {
        stateAll = instanceKeys.map((instanceKey) => {
          return [instanceKey, state[instanceKey][stateLink.stateName]];
        });
      }
      if (isEqual(prevStateAllRef.current.prevStateAll, stateAll)) {
        prevStateAllRef.current.prevStateAll = stateAll;
        return stateAll;
      }
      else {
        return prevStateAllRef.current.prevStateAll;
      }
    }, [instanceKeys, stateLink]);

    return useSyncExternalStoreWithSelector(
      subscribe,
      getSnapshot,
      null,
      selector,
    );
  };
}

function isEqual(
  prevStateAll: [instanceKey: InstanceKey, state: StoreState][],
  stateAll: [instanceKey: InstanceKey, state: StoreState][],
) {
  if (prevStateAll.length !== stateAll.length) {
    return false;
  }
  else {
    return prevStateAll.every(([prevInstanceKey, prevState]) => {
      const stateAllEntry = stateAll.find(([instanceKey]) => {
        return prevInstanceKey === instanceKey;
      });
      return stateAllEntry && stateAllEntry[1] === prevState;
    });
  }
}
