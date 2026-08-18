import type { Reducer } from './Reducer.tsx';
import type { StoreState } from './StoreState.tsx';

export type ReducerMap<
  TStoreState extends StoreState = StoreState,
> = Record<string, Reducer<TStoreState, void | any>>
  & {
    $$init: Reducer<TStoreState, void | any>;
    $$reset: Reducer<TStoreState, void | any>;
  };
