import type { InstanceKey } from './index.tsx';
import type { Reducer } from './index.tsx';
import type { ReducerPayload } from './index.tsx';
import type { StoreState } from './index.tsx';

export type Dispatcher<
  TStoreState extends StoreState = StoreState,
  TReducer extends Reducer<TStoreState, any> = Reducer<TStoreState, any>,
> = {
  (
    payload: ReducerPayload<TStoreState, TReducer>,
  ): void;
  (
    instanceKey: InstanceKey,
    payload: ReducerPayload<TStoreState, TReducer>,
  ): void;
};
