import { useCallback } from 'react';
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
  >(stateLink: StateLink<string, TStoreState, TReducerMap, TStateName>, instanceKeys?: InstanceKey[] | ((state: TStoreState) => boolean)): [instanceKey: InstanceKey, state: TStoreState[TStateName]][] {
    const internalStoreProps = stateLink[INTERNAL_STORE_PROPS_ACCESSOR];

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

      return actualInstanceKeys.map((instanceKey): [instanceKey: InstanceKey, state: TStoreState[TStateName]] => {
        return [instanceKey, stateAll[instanceKey][stateLink.stateName]];
      });
    }, [instanceKeys, stateLink]);

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
