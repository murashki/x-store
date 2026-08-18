import type { InstanceKey } from './InstanceKey.tsx';
import type { ReducerMap } from './ReducerMap.tsx';
import type { StateLink } from './StateLink.tsx';
import type { StoreState } from './StoreState.tsx';

export type UsePropAll = {
  <
    TStoreState extends StoreState = StoreState,
    TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
    TStateName extends keyof TStoreState = keyof TStoreState,
  >(
    stateLink: StateLink<string, TStoreState, TReducerMap, TStateName>,
    instanceKeys?: InstanceKey[] | ((state: TStoreState) => boolean),
  ): [instanceKey: InstanceKey, state: TStoreState[TStateName]][];
};
