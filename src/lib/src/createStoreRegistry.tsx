import type { StoreRegistry } from './types/StoreRegistry.tsx';
import { createUseDispatcher } from './createUseDispatcher.tsx';
import { createUseLatest } from './createUseLatest.tsx';
import { createUseProp } from './createUseProp.tsx';
import { createUsePropAll } from './createUsePropAll.tsx';
import { createUseStore } from './createUseStore.tsx';

export function createStoreRegistry() {
  const storeRegistry: StoreRegistry = {};

  const useStore = createUseStore(storeRegistry);
  const useProp = createUseProp(storeRegistry);
  const usePropAll = createUsePropAll(storeRegistry);
  const useDispatcher = createUseDispatcher(storeRegistry);
  const useLatest = createUseLatest(storeRegistry);

  return {
    storeRegistry,
    useStore,
    useProp,
    usePropAll,
    useDispatcher,
    useLatest,
  };
}
