import React from 'react';

import { type InstanceKey } from './';
import { type Reducer } from './';
import { type StoreState } from './';

export type InternalStoreProps<
  TStoreName extends string = string,
  TStoreState extends StoreState = StoreState,
  TInitReducer extends Reducer<TStoreState, any> = Reducer<TStoreState, any>,
  TResetReducer extends Reducer<TStoreState, any> = Reducer<TStoreState, any>,
> = {
  [`$$init`]: TInitReducer;
  [`$$reset`]: TResetReducer;
  context: React.Context<null | InstanceKey>;
  initialState: TStoreState;
  name: TStoreName;
  uniqKey: symbol;
};
