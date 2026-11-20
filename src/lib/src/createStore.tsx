import React from 'react';

import type { InternalStoreProps } from './types/InternalStoreProps.tsx';
import type { LockedOverride } from './types/LockedOverride.tsx';
import type { Payload } from './types/Payload.tsx';
import type { ReducerMap } from './types/ReducerMap.tsx';
import type { Store } from './types/Store.tsx';
import type { StoreContextValue } from './types/StoreContextValue.tsx';
import type { StoreState } from './types/StoreState.tsx';
import type { Unlocked } from './types/Unlocked.tsx';
import type { UnlockedState } from './types/UnlockedState.tsx';
import { INITIALIZED_STATE_NAME } from './constants.tsx';
import { INSTANCE_KEY_STATE_NAME } from './constants.tsx';
import { INTERNAL_STORE_PROPS_ACCESSOR } from './constants.tsx';
import { REDUCER_LINK_FLAG } from './constants.tsx';
import { STATE_LINK_FLAG } from './constants.tsx';
import { isLocked } from './isLocked.tsx';
import { isLockedOverride } from './isLockedOverride.tsx';

type CheckInitialState<
  TStoreState extends StoreState = StoreState,
> = {
  [TKey in keyof TStoreState]: TKey extends `$$initialized` | `$$instanceKey`
    ? void
    : unknown extends Unlocked<TStoreState[TKey]>
      ? TStoreState[TKey]
      : undefined extends Unlocked<TStoreState[TKey]>
        ? never
        : TStoreState[TKey] extends LockedOverride
          ? never
          : TStoreState[TKey];
};

type CheckReducerMap<
  TStoreState extends StoreState = StoreState,
  TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
> = {
  [TKey in keyof TReducerMap]: TKey extends `$$initialized` | `$$instanceKey`
    ? void
    : TKey extends keyof TStoreState
      ? void
      : TReducerMap[TKey] extends (...args: any) => any
        ? [Parameters<TReducerMap[TKey]>[1]] extends [void]
          ? TReducerMap[TKey]
          : [Parameters<TReducerMap[TKey]>[1]] extends [Payload]
            ? Parameters<TReducerMap[TKey]>[1] extends readonly unknown[]
              ? void
              : TReducerMap[TKey]
            : void
        : void;
};

export function createStore<
  TStoreName extends string = string,
  TStoreState extends StoreState = StoreState,
  TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
>(
  name: TStoreName,
  initialState: TStoreState & CheckInitialState<TStoreState>,
  reducerMap: TReducerMap & CheckReducerMap<TStoreState, TReducerMap>,
): Store<TStoreName, TStoreState, TReducerMap> {
  const context = React.createContext<null | StoreContextValue<TStoreState>>(null);

  const lockedStateNames: string[] = [];
  const unlockedInitialState: UnlockedState<TStoreState> = { ...initialState };

  for (const key in initialState) {
    const value: TStoreState[typeof key] = initialState[key];
    if (isLocked(value)) {
      lockedStateNames.push(key);
      unlockedInitialState[key] = value.value;
    }
    else if (isLockedOverride(value)) {
      lockedStateNames.push(key);
      unlockedInitialState[key] = value.value;
      console.warn(`You used \`OVERRIDE_LOCKED\` in initial state [store: ${name}, property: ${key}]. Use \`LOCKED\` instead.`);
    }
    else {
      unlockedInitialState[key] = value;
    }
    if (unlockedInitialState[key] === undefined) {
      console.warn(`Store property must not be \`undefined\`, use \`null\` instead [store: ${name}, property: ${key}]`);
    }
  }

  const internalStoreProps: InternalStoreProps<TStoreName, TStoreState, TReducerMap> = {
    $$init: reducerMap.$$init,
    $$reset: reducerMap.$$reset,
    context,
    initialState,
    lockedStateNames,
    name,
    uniqKey: Symbol(`Store: ` + name),
    unlockedInitialState,
  };

  const store = {
    [INTERNAL_STORE_PROPS_ACCESSOR]: internalStoreProps,
  } as any;

  for (const key in initialState) {
    store[key] = {
      [INTERNAL_STORE_PROPS_ACCESSOR]: internalStoreProps,
      stateName: key,
      type: STATE_LINK_FLAG,
    };
  }

  store[INITIALIZED_STATE_NAME] = {
    [INTERNAL_STORE_PROPS_ACCESSOR]: internalStoreProps,
    stateName: INITIALIZED_STATE_NAME,
    type: STATE_LINK_FLAG,
  };

  store[INSTANCE_KEY_STATE_NAME] = {
    [INTERNAL_STORE_PROPS_ACCESSOR]: internalStoreProps,
    stateName: INSTANCE_KEY_STATE_NAME,
    type: STATE_LINK_FLAG,
  };

  for (const key in reducerMap) {
    if ( ! (key in initialState) && ! [`$$init`, `$$reset`].includes(key)) {
      store[key] = {
        [INTERNAL_STORE_PROPS_ACCESSOR]: internalStoreProps,
        reducer: reducerMap[key],
        reducerName: key,
        type: REDUCER_LINK_FLAG,
      };
    }
  }

  return store as Store<TStoreName, TStoreState, TReducerMap>;
}
