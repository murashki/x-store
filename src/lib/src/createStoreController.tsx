import type { InternalStoreProps } from './types/InternalStoreProps.tsx';
import type { ReducerMap } from './types/ReducerMap.tsx';
import type { StoreController } from './types/StoreController.tsx';
import type { StoreRegistry } from './types/StoreRegistry.tsx';
import type { StoreState } from './types/StoreState.tsx';
import { InternalStore } from './InternalStore.tsx';

export function createStoreController<
  TStoreState extends StoreState = StoreState,
  TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
>(
  storeRegistry: StoreRegistry,
  internalStoreProps: InternalStoreProps<string, TStoreState, TReducerMap>,
): StoreController<TStoreState, TReducerMap> {
  let storeController = storeRegistry[internalStoreProps.uniqKey] as StoreController<TStoreState, TReducerMap>;
  if ( ! storeController) {
    const internalStore = new InternalStore<TStoreState, TReducerMap>(internalStoreProps.name);
    storeController = { earlySubscribers: {}, instances: {}, internalStore };
    storeRegistry[internalStoreProps.uniqKey] = storeController as StoreController;
  }
  return storeController;
}
