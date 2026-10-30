import type { StoreRegistry } from './types/StoreRegistry.tsx';
import { createStoreProvider } from './StoreProvider.tsx';
import { createUseDispatcher } from './createUseDispatcher.tsx';
import { createUseLatest } from './createUseLatest.tsx';
import { createUseProp } from './createUseProp.tsx';
import { createUsePropAll } from './createUsePropAll.tsx';
import { createUsePropSelector } from './createUsePropSelector.tsx';
import { createUsePropSelectorAll } from './createUsePropSelectorAll.tsx';
import { createUseStore } from './createUseStore.tsx';

export function createStoreRegistry() {
  const storeRegistry: StoreRegistry = Object.create(null);

  const useStore = createUseStore(storeRegistry);
  const useProp = createUseProp(storeRegistry);
  const usePropAll = createUsePropAll(storeRegistry);
  const usePropSelector = createUsePropSelector(storeRegistry);
  const usePropSelectorAll = createUsePropSelectorAll(storeRegistry);
  const useDispatcher = createUseDispatcher(storeRegistry);
  const useLatest = createUseLatest(storeRegistry);
  const StoreProvider = createStoreProvider(useStore);

  return {
    StoreProvider,
    storeRegistry,
    useDispatcher,
    useLatest,
    useProp,
    usePropAll,
    usePropSelector,
    usePropSelectorAll,
    useStore,
  };
}
