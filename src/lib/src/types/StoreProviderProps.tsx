import React from 'react';

import type { InstanceKey } from './InstanceKey.tsx';
import type { ReducerMap } from './ReducerMap.tsx';
import type { Store } from './Store.tsx';
import type { StoreState } from './StoreState.tsx';

export type StoreProviderProps<
  TStoreName extends string = string,
  TStoreState extends StoreState = StoreState,
  TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
> = React.PropsWithChildren<{
  instanceKey?: InstanceKey;
  prefill?: Partial<TStoreState>;
  store: Store<TStoreName, TStoreState, TReducerMap>;
}>;
