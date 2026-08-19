import React from 'react';

import type { InstanceKey } from './types/InstanceKey.tsx';
import type { ReducerMap } from './types/ReducerMap.tsx';
import type { Store } from './types/Store.tsx';
import type { StoreState } from './types/StoreState.tsx';
import { INTERNAL_STORE_PROPS_ACCESSOR } from './constants.tsx';

export type StoreProviderProps<
  TStoreName extends string = string,
  TStoreState extends StoreState = StoreState,
  TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
> = React.PropsWithChildren<{
  // initialState: Partial<TStoreState>;
  instanceKey: InstanceKey;
  store: Store<TStoreName, TStoreState, TReducerMap>;
}>;

export function StoreProvider<
  TStoreName extends string = string,
  TStoreState extends StoreState = StoreState,
  TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
>({
  children,
  // initialState,
  instanceKey,
  store,
}: StoreProviderProps<TStoreName, TStoreState, TReducerMap>) {
  const Context = store[INTERNAL_STORE_PROPS_ACCESSOR].context;

  return (
    <Context.Provider value={instanceKey}>
      {children}
    </Context.Provider>
  );
}
