import type { Payload } from './Payload.tsx';
import type { Reducer } from './Reducer.tsx';
import type { StoreState } from './StoreState.tsx';

export type DeferredAction<
  TStoreState extends StoreState = StoreState,
> = {
  payload: void | Payload;
  reducer: Reducer<TStoreState, any>;
};
