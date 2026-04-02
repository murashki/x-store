import { type Payload } from './';
import { type Reducer } from './';
import { type StoreState } from './';

export type ReducerPayload<
  TStoreState extends StoreState = StoreState,
  TReducer extends Reducer<TStoreState, any> = Reducer<TStoreState, any>,
> = Parameters<TReducer>[1] extends Payload ? Parameters<TReducer>[1] : void;
