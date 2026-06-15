import React from 'react';

import type { InstanceKey } from './index.tsx';
import type { Reducer } from './index.tsx';
import type { StoreState } from './index.tsx';

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
