import React from 'react';

import { type InstanceKey } from './types/index.tsx';
import { type Store } from './types/index.tsx';
import { INTERNAL_STORE_PROPS_ACCESSOR } from './constants.tsx';

export type StoreProviderProps = React.PropsWithChildren<{
  store: Store;
  instanceKey: InstanceKey;
}>;

export function StoreProvider(props: StoreProviderProps) {
  const Context = props.store[INTERNAL_STORE_PROPS_ACCESSOR].context;

  return (
    <Context.Provider value={props.instanceKey}>
      {props.children}
    </Context.Provider>
  );
}
