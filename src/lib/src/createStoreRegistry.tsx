import { type StoreRegistry } from './types/index.tsx';
import { createUseDispatcher } from './createUseDispatcher.tsx';
import { createUseProp } from './createUseProp.tsx';
import { createUsePropAll } from './createUsePropAll.tsx';
import { createUseStore } from './createUseStore.tsx';

export function createStoreRegistry() {
  const storeRegistry: StoreRegistry = {};

  const useDispatcher = createUseDispatcher(storeRegistry);
  const useProp = createUseProp(storeRegistry);
  const usePropAll = createUsePropAll(storeRegistry);
  const useStore = createUseStore(storeRegistry);

  return {
    useDispatcher,
    useProp,
    usePropAll,
    useStore,
  };
}
