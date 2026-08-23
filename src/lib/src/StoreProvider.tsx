import React from 'react';
import { useMemo } from 'react';

import type { InstanceKey } from './types/InstanceKey.tsx';
import type { ReducerMap } from './types/ReducerMap.tsx';
import type { Store } from './types/Store.tsx';
import type { StoreContextValue } from './types/StoreContextValue.tsx';
import type { StoreState } from './types/StoreState.tsx';
import { DEFAULT_INSTANCE_KEY } from './constants.tsx';
import { INTERNAL_STORE_PROPS_ACCESSOR } from './constants.tsx';

export type StoreProviderProps<
  TStoreName extends string = string,
  TStoreState extends StoreState = StoreState,
  TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
> = React.PropsWithChildren<{
  // initialState: Partial<TStoreState>;
  instanceKey?: InstanceKey;
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

  const contextValue = useMemo<StoreContextValue>(() => {
    return { instanceKey: instanceKey ?? DEFAULT_INSTANCE_KEY };
  }, [instanceKey]);

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
}
