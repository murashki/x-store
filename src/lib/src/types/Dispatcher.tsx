import { type InstanceKey } from './';
import { type Reducer } from './';
import { type ReducerPayload } from './';
import { type StoreState } from './';

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
