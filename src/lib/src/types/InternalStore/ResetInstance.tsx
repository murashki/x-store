import type { Reducer } from '../Reducer.tsx';
import type { StoreState } from '../StoreState.tsx';

export type ResetInstance<
  TStoreState extends StoreState = StoreState,
> = {
  (
    resetReducer: Reducer<TStoreState, void>,
  ): void;
};
