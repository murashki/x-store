import type { ReducerMap } from './index.tsx';
import type { ReducerPayload } from './index.tsx';
import type { StoreState } from './index.tsx';

export type ResetPayload<
  TStoreState extends StoreState = StoreState,
  TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
> = ReducerPayload<TStoreState, TReducerMap[`$$reset`]>;
