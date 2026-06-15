import type { Reducer } from './index.tsx';
import type { StoreState } from './index.tsx';

export type ReducerMap<
  TStoreState extends StoreState = StoreState,
> = Record<string, Reducer<TStoreState, void | any>>
  & {
    [`$$init`]: Reducer<TStoreState, void | any>;
    [`$$reset`]: Reducer<TStoreState, void | any>;
  };
