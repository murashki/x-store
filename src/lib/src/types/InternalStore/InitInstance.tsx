import type { InstanceKey } from '../InstanceKey.tsx';
import type { Reducer } from '../Reducer.tsx';
import type { StoreState } from '../StoreState.tsx';

export type InitInstance<
  TStoreState extends StoreState = StoreState,
> = {
  (
    instanceKey: InstanceKey,
    initialState: TStoreState,
    prefill: undefined | Partial<TStoreState>,
    initReducer: Reducer<TStoreState, Partial<TStoreState>>,
  ): void;
};
