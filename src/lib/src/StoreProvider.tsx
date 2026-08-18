import React from 'react';

import type { InstanceKey } from './types/InstanceKey.tsx';
import { INTERNAL_STORE_PROPS_ACCESSOR } from './constants.tsx';

export type StoreProviderProps = React.PropsWithChildren<{
  store: { [INTERNAL_STORE_PROPS_ACCESSOR]: { context: React.Context<null | InstanceKey> } };
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
