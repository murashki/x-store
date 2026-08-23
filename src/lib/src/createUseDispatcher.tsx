import { useContext } from 'react';
import { useMemo } from 'react';
import type { ReducerMap } from './types/ReducerMap.tsx';

import type { Dispatcher } from './types/Dispatcher.tsx';
import type { InstanceKey } from './types/InstanceKey.tsx';
import type { ReducerLink } from './types/ReducerLink.tsx';
import type { ReducerPayload } from './types/ReducerPayload.tsx';
import type { StoreRegistry } from './types/StoreRegistry.tsx';
import type { StoreState } from './types/StoreState.tsx';
import { DEFAULT_INSTANCE_KEY } from './constants.tsx';
import { INTERNAL_STORE_PROPS_ACCESSOR } from './constants.tsx';
import { InternalStore } from './InternalStore.tsx';

export function createUseDispatcher(storeRegistry: StoreRegistry) {
  return function useDispatcher<
    TStoreState extends StoreState = StoreState,
    TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
    TReducerName extends string = string,
    TPayload extends ReducerPayload<TReducerMap[TReducerName]> = ReducerPayload<TReducerMap[TReducerName]>,
  >(
    reducerLink: ReducerLink<string, TStoreState, TReducerMap, TReducerName>,
  ): Dispatcher<TPayload> {
    const contextInstanceKey = useContext(reducerLink[INTERNAL_STORE_PROPS_ACCESSOR].context)?.instanceKey;

    return useMemo(() => {
      const internalStoreProps = reducerLink[INTERNAL_STORE_PROPS_ACCESSOR];

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

        // TODO Вынести в отдельную функцию, т.к. уже встречается в проекте пару раз
        if ( ! (internalStoreProps.uniqKey in storeRegistry)) {
          throw new Error(`Store "${internalStoreProps.name}" is not registered.`);
        }

        // TODO Вынести в отдельную функцию, т.к. уже встречается в проекте пару раз
        if ( ! (storeRegistry[internalStoreProps.uniqKey].instances[actualInstanceKey])) {
          throw new Error(`Store "${internalStoreProps.name}" is not initialized for instance "${String(actualInstanceKey)}".`);
        }

        const internalStore = storeRegistry[internalStoreProps.uniqKey].internalStore as InternalStore<TStoreState, TReducerMap>;

        internalStore.dispatch(actualInstanceKey, payload, reducerLink.reducer);
      }

      return dispatch;
    }, [contextInstanceKey, reducerLink]);
  };
}
