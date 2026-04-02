import { INTERNAL_STORE_PROPS_ACCESSOR } from '../constants.tsx';
import { REDUCER_LINK } from '../constants.tsx';
import { type InternalStoreProps } from './';
import { type Reducer } from './';
import { type StoreState } from './';

export type ReducerLink<
  TStoreName extends string = string,
  TStoreState extends StoreState = StoreState,
  TInitReducer extends Reducer<TStoreState, any> = Reducer<TStoreState, any>,
  TResetReducer extends Reducer<TStoreState, any> = Reducer<TStoreState, any>,
  TReducerName extends string = string,
  TReducer extends Reducer<TStoreState, any> = Reducer<TStoreState, any>,
> = {
  [INTERNAL_STORE_PROPS_ACCESSOR]: InternalStoreProps<TStoreName, TStoreState, TInitReducer, TResetReducer>;
  reducer: TReducer,
  reducerName: TReducerName,
  type: typeof REDUCER_LINK,
};
