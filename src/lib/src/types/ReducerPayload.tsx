import type { Payload } from './index.tsx';
import type { Reducer } from './index.tsx';
import type { StoreState } from './index.tsx';

export type ReducerPayload<
  TStoreState extends StoreState = StoreState,
  TReducer extends Reducer<TStoreState, any> = Reducer<TStoreState, any>,
> = Parameters<TReducer>[1] extends Payload ? Parameters<TReducer>[1] : void;
