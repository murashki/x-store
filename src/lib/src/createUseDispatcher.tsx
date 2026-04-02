import { useContext } from 'react';
import { useMemo } from 'react';
import type { ReducerMap } from './types/index.tsx';

import { type Dispatcher } from './types/index.tsx';
import { type InstanceKey } from './types/index.tsx';
import { type Payload } from './types/index.tsx';
import { type StoreState } from './types/index.tsx';
import { type Reducer } from './types/index.tsx';
import { type ReducerLink } from './types/index.tsx';
import { type StoreRegistry } from './types/index.tsx';
import { DEFAULT_INSTANCE_KEY } from './constants.tsx';
import { INTERNAL_STORE_PROPS_ACCESSOR } from './constants.tsx';
import { InternalStore } from './InternalStore.tsx';

export function createUseDispatcher(storeRegistry: StoreRegistry) {
  return function useDispatcher<
    TStoreState extends StoreState = StoreState,
    TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
    TReducerName extends string = string,
    TReducer extends Reducer<TStoreState, any> = Reducer<TStoreState, any>,
  >(
    reducerLink: ReducerLink<string, TStoreState, TReducerMap[`$$init`], TReducerMap[`$$reset`], TReducerName, TReducer>,
  ): Dispatcher<TStoreState, TReducer> {
    const contextInstanceKey = useContext(reducerLink[INTERNAL_STORE_PROPS_ACCESSOR].context);

    return useMemo(() => {
      const internalStoreProps = reducerLink[INTERNAL_STORE_PROPS_ACCESSOR];

      function dispatch(
        payload: void | Payload,
      ): void

      function dispatch(
        instanceKey: InstanceKey,
        payload: void | Payload,
      ): void

      function dispatch(
        ...args: (InstanceKey | void | Payload)[]
      ): void {
        let instanceKey: undefined | InstanceKey;
        let payload: void | Payload;

        if ([`number`, `symbol`, `string`].includes(typeof args[0])) {
          instanceKey = args[0] as undefined | InstanceKey;
          payload = args[1] as void | Payload;
        } else {
          payload = args[0] as void | Payload;
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

        const internalStore = storeRegistry[internalStoreProps.uniqKey].internalStore as InternalStore<TStoreState, TReducerMap[`$$init`], TReducerMap[`$$reset`]>;

        internalStore.dispatch(actualInstanceKey, payload, reducerLink.reducer);
      }

      return dispatch;
    }, [contextInstanceKey, reducerLink]);
  };
}
