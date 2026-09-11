import { useContext } from 'react';
import { useMemo } from 'react';
import { useRef } from 'react';
import type { ReducerMap } from './types/ReducerMap.tsx';

import type { Dispatcher } from './types/Dispatcher.tsx';
import type { InstanceKey } from './types/InstanceKey.tsx';
import type { ReducerLink } from './types/ReducerLink.tsx';
import type { ReducerPayload } from './types/ReducerPayload.tsx';
import type { StoreRegistry } from './types/StoreRegistry.tsx';
import type { StoreState } from './types/StoreState.tsx';
import { DEFAULT_INSTANCE_KEY } from './constants.tsx';
import { INTERNAL_STORE_PROPS_ACCESSOR } from './constants.tsx';
import { ensureInternalStore } from './ensureInternalStore.tsx';

export function createUseDispatcher(storeRegistry: StoreRegistry) {
  return function useDispatcher<
    TStoreState extends StoreState = StoreState,
    TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
    TReducerName extends string = string,
    TPayload extends ReducerPayload<TReducerMap[TReducerName]> = ReducerPayload<TReducerMap[TReducerName]>,
  >(
    reducerLink: ReducerLink<string, TStoreState, TReducerMap, TReducerName>,
  ): Dispatcher<TPayload> {
    const reducerLinkRef = useRef<{ reducerLink: ReducerLink<string, TStoreState, TReducerMap, TReducerName> }>({ reducerLink });

    if (reducerLinkRef.current.reducerLink !== reducerLink) {
      console.warn(`Reducer link reference mismatch. You must pass the same reducer link on every render.`);
    }

    const actualReducerLink = reducerLinkRef.current.reducerLink;
    const internalStoreProps = actualReducerLink[INTERNAL_STORE_PROPS_ACCESSOR];
    const storeContextValue = useContext(internalStoreProps.context);
    const contextInstanceKey = storeContextValue?.instanceKey;

    return useMemo(() => {
      const internalStoreProps = actualReducerLink[INTERNAL_STORE_PROPS_ACCESSOR];

      function dispatch(
        payload: TPayload,
      ): void

      function dispatch(
        instanceKey: InstanceKey,
        payload: TPayload,
      ): void

      function dispatch(
        ...args: (InstanceKey | TPayload)[]
      ): void {
        let instanceKey: undefined | InstanceKey;
        let payload: TPayload;

        if ([`symbol`, `string`].includes(typeof args[0])) {
          instanceKey = args[0] as undefined | InstanceKey;
          payload = args[1] as TPayload;
        }
        else {
          payload = args[0] as TPayload;
        }

        const actualInstanceKey = instanceKey ?? contextInstanceKey ?? DEFAULT_INSTANCE_KEY;
        const internalStore = ensureInternalStore(storeRegistry, internalStoreProps);

        internalStore.dispatch(actualInstanceKey, actualReducerLink.reducer, payload);
      }

      return dispatch;
    }, [actualReducerLink, contextInstanceKey]);
  };
}
