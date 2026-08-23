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
import { createStoreController } from './createStoreController.tsx';

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

    const storeController = createStoreController(storeRegistry, internalStoreProps);

    const subscribe = useCallback((listener: () => void) => {
      return storeController.internalStore.subscribeAll(listener);
    }, [storeController]);

    const getSnapshot = useCallback(() => {
      return storeController.internalStore.getStateAll();
    }, [storeController]);

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

      const nextStateAll = actualInstanceKeys.map((instanceKey): [instanceKey: InstanceKey, state: TStoreState[TStateName]] => {
        return [instanceKey, stateAll[instanceKey][stateLink.stateName]];
      });

      if (isEqual(prevStateAllRef.current.prevStateAll, nextStateAll)) {
        return prevStateAllRef.current.prevStateAll;
      }
      else {
        return prevStateAllRef.current.prevStateAll = nextStateAll;
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
