import type { InstanceKey } from '../InstanceKey.tsx';
import type { Reducer } from '../Reducer.tsx';
import type { StoreState } from '../StoreState.tsx';

export type ResetInstance<
  TStoreState extends StoreState = StoreState,
> = {
  (
    instanceKey: InstanceKey,
    resetReducer: Reducer<TStoreState, void>,
  ): void;
};
