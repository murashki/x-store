import type { Reducer } from './Reducer.tsx';
import type { StoreState } from './StoreState.tsx';

export type StoreInstanceController<
  TStoreState extends StoreState = StoreState,
> = {
  owners: symbol[];
  resetState: (resetReducer: Reducer<TStoreState, void>) => void;
};
