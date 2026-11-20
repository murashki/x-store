import type { InstanceKey } from '../InstanceKey.tsx';
import type { Prefill } from '../Prefill.tsx';
import type { Reducer } from '../Reducer.tsx';
import type { StoreState } from '../StoreState.tsx';
import type { UnlockedState } from '../UnlockedState.tsx';

export type InitInstance<
  TStoreState extends StoreState = StoreState,
> = {
  (
    instanceKey: InstanceKey,
    initReducer: Reducer<TStoreState, Prefill<TStoreState>>,
    unlockedInitialState: UnlockedState<TStoreState>,
    prefill?: Prefill<TStoreState>,
  ): void;
};
