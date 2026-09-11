import type { InternalStoreProps } from './types/InternalStoreProps.tsx';
import type { ReducerMap } from './types/ReducerMap.tsx';
import type { StoreRegistry } from './types/StoreRegistry.tsx';
import type { StoreState } from './types/StoreState.tsx';
import { InternalStore } from './InternalStore.tsx';

export function ensureInternalStore<
  TStoreState extends StoreState = StoreState,
  TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
>(
  storeRegistry: StoreRegistry,
  internalStoreProps: InternalStoreProps<string, TStoreState, TReducerMap>,
): InternalStore<TStoreState> {
  let internalStore = storeRegistry[internalStoreProps.uniqKey] as InternalStore<TStoreState>;
  if ( ! internalStore) {
    internalStore = new InternalStore<TStoreState>(internalStoreProps.name);
    storeRegistry[internalStoreProps.uniqKey] = internalStore as InternalStore;
  }
  return internalStore;
}
