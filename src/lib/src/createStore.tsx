import React from 'react';

import { type InstanceKey } from './types/index.tsx';
import { type InternalStoreProps } from './types/index.tsx';
import { type Payload } from './types/index.tsx';
import { type Reducer } from './types/index.tsx';
import { type ReducerMap } from './types/index.tsx';
import { type Store } from './types/index.tsx';
import { type StoreState } from './types/index.tsx';
import { INTERNAL_STORE_PROPS_ACCESSOR } from './constants.tsx';
import { REDUCER_LINK } from './constants.tsx';
import { STATE_LINK } from './constants.tsx';

type CheckReducerMap<
  TStoreState extends StoreState = StoreState,
  TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
> = {
  [TKey in keyof TReducerMap]: TKey extends keyof TStoreState
    ? void
    : TReducerMap[TKey] extends (state: any, payload: void) => any
      ? TReducerMap[TKey]
      : TReducerMap[TKey] extends (state: any, payload: infer TPayload) => any
        ? TPayload extends Payload
          ? TReducerMap[TKey]
          : Reducer<TStoreState>
        : void;
};

export function createStore<
  TStoreName extends string = string,
  TStoreState extends StoreState = StoreState,
  TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
>(
  name: TStoreName,
  initialState: TStoreState,
  reducers: CheckReducerMap<TStoreState, TReducerMap>,
): Store<TStoreName, TStoreState, TReducerMap> {
  const context = React.createContext<null | InstanceKey>(null);

  const internalStoreProps: InternalStoreProps<TStoreName, TStoreState, TReducerMap[`$$init`], TReducerMap[`$$reset`]> = {
    [`$$init`]: reducers[`$$init`] as Reducer<TStoreState>,
    [`$$reset`]: reducers[`$$reset`] as Reducer<TStoreState>,
    context,
    initialState,
    name,
    uniqKey: Symbol(`Store: ` + name),
  };

  const store = {
    [INTERNAL_STORE_PROPS_ACCESSOR]: internalStoreProps,
  } as any;

  for (const key in initialState) {
    store[key] = {
      [INTERNAL_STORE_PROPS_ACCESSOR]: internalStoreProps,
      stateName: key,
      type: STATE_LINK,
    };
  }

  for (const key in reducers) {
    if ( ! (key in initialState) && ! [`$$init`, `$$reset`].includes(key)) {
      store[key] = {
        [INTERNAL_STORE_PROPS_ACCESSOR]: internalStoreProps,
        reducer: reducers[key],
        reducerName: key,
        type: REDUCER_LINK,
      };
    }
  }

  return store as Store<TStoreName, TStoreState, TReducerMap>;
}



