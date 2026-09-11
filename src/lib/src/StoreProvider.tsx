import { useMemo } from 'react';
import { useRef } from 'react';

import type { createUseStore } from './createUseStore.tsx';
import type { ReducerMap } from './types/ReducerMap.tsx';
import type { StoreContextValue } from './types/StoreContextValue.tsx';
import type { StoreProviderProps } from './types/StoreProviderProps.tsx';
import type { StoreState } from './types/StoreState.tsx';
import { DEFAULT_INSTANCE_KEY } from './constants.tsx';
import { INTERNAL_STORE_PROPS_ACCESSOR } from './constants.tsx';

export function createStoreProvider(useStore: ReturnType<typeof createUseStore>) {
  return function StoreProvider<
    TStoreName extends string = string,
    TStoreState extends StoreState = StoreState,
    TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
  >(props: StoreProviderProps<TStoreName, TStoreState, TReducerMap>) {
    const internalStoreProps = props.store[INTERNAL_STORE_PROPS_ACCESSOR];
    const Context = internalStoreProps.context;
    const actualInstanceKey = props.instanceKey ?? DEFAULT_INSTANCE_KEY;
    const prefillRef = useRef<{ prefill: undefined | Partial<TStoreState> }>({ prefill: props.prefill });

    useStore(props.store, [actualInstanceKey], (initInstance) => {
      return initInstance(prefillRef.current.prefill);
    });

    const contextValue = useMemo<StoreContextValue<TStoreState>>(() => {
      return { instanceKey: actualInstanceKey, uninitializedState: { ...internalStoreProps.initialState, ...prefillRef.current.prefill } };
    }, [actualInstanceKey, internalStoreProps]);

    return (
      <Context.Provider
        value={contextValue}
      >
        {props.children}
      </Context.Provider>
    );
  };
}
