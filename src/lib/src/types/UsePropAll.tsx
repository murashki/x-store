import type { InstanceKey } from './index.tsx';
import type { ReducerMap } from './index.tsx';
import type { StateLink } from './index.tsx';
import type { StoreState } from './index.tsx';

export type UsePropAll = {
  <
    TStoreState extends StoreState = StoreState,
    TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
    TStateName extends keyof TStoreState = keyof TStoreState,
  >(
    stateLink: StateLink<string, TStoreState, TReducerMap[`$$init`], TReducerMap[`$$reset`], TStateName>,
    instanceKeys?: InstanceKey[] | ((state: TStoreState) => boolean),
  ): [instanceKey: InstanceKey, state: TStoreState[TStateName]][];
};
