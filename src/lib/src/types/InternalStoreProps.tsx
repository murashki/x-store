import React from 'react';

import type { InstanceKey } from './index.tsx';
import type { ReducerMap } from './index.tsx';
import type { StoreState } from './index.tsx';

export type InternalStoreProps<
  TStoreName extends string = string,
  TStoreState extends StoreState = StoreState,
  TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
> = {
  [`$$init`]: TReducerMap[`$$init`];
  [`$$reset`]: TReducerMap[`$$reset`];
  context: React.Context<null | InstanceKey>;
  initialState: TStoreState;
  name: TStoreName;
  uniqKey: symbol;
};
