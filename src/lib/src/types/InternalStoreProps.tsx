import React from 'react';

import type { InstanceKey } from './InstanceKey.tsx';
import type { ReducerMap } from './ReducerMap.tsx';
import type { StoreState } from './StoreState.tsx';

export type InternalStoreProps<
  TStoreName extends string = string,
  TStoreState extends StoreState = StoreState,
  TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
> = {
  $$init: TReducerMap[`$$init`];
  $$reset: TReducerMap[`$$reset`];
  context: React.Context<null | InstanceKey>;
  initialState: TStoreState;
  name: TStoreName;
  uniqKey: symbol;
};
