import { INTERNAL_STORE_PROPS_ACCESSOR } from '../constants.tsx';
import { STATE_LINK } from '../constants.tsx';
import { type InternalStoreProps } from './';
import { type Reducer } from './';
import { type StoreState } from './';

export type StateLink<
  TStoreName extends string = string,
  TStoreState extends StoreState = StoreState,
  TInitReducer extends Reducer<TStoreState, any> = Reducer<TStoreState, any>,
  TResetReducer extends Reducer<TStoreState, any> = Reducer<TStoreState, any>,
  TStateName extends keyof TStoreState = keyof TStoreState,
> = {
  [INTERNAL_STORE_PROPS_ACCESSOR]: InternalStoreProps<TStoreName, TStoreState, TInitReducer, TResetReducer>;
  stateName: TStateName,
  type: typeof STATE_LINK,
};
