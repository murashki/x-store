import type { InstanceKey } from './InstanceKey.tsx';
import type { ReducerMap } from './ReducerMap.tsx';
import type { StateLink } from './StateLink.tsx';
import type { StoreState } from './StoreState.tsx';
import type { Unlocked } from './Unlocked.tsx';
import type { UnlockedState } from './UnlockedState.tsx';

export type UsePropSelectorAll = {
  <
    TStoreState extends StoreState = StoreState,
    TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
    TStateName extends keyof TStoreState = keyof TStoreState,
  >(
    stateLink: StateLink<string, TStoreState, TReducerMap, TStateName>,
    instanceKeys?: InstanceKey[] | ((state: UnlockedState<TStoreState>) => boolean),
  ): () => [instanceKey: InstanceKey, state: Unlocked<TStoreState[TStateName]>][];
};
