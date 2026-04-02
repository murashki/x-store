import { type ReducerMap } from './';
import { type ReducerPayload } from './';
import { type StoreState } from './';

export type ResetPayload<
  TStoreState extends StoreState = StoreState,
  TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
> = ReducerPayload<TStoreState, TReducerMap[`$$reset`]>;
