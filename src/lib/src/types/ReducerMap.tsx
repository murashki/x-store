import { type Reducer } from './';
import { type StoreState } from './';

export type ReducerMap<
  TStoreState extends StoreState = StoreState,
> = Record<string, Reducer<TStoreState, void | any>>
  & {
    [`$$init`]: Reducer<TStoreState, void | any>;
    [`$$reset`]: Reducer<TStoreState, void | any>;
  };
