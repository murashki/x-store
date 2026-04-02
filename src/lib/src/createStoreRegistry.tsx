import { type StoreRegistry } from './types/index.tsx';
import { createUseDispatcher } from './createUseDispatcher.tsx';
import { createUseState } from './createUseState.tsx';
import { createUseStateAll } from './createUseStateAll.tsx';
import { createUseStore } from './createUseStore.tsx';

export function createStoreRegistry() {
  const storeRegistry: StoreRegistry = {};

  const useDispatcher = createUseDispatcher(storeRegistry);
  const useState = createUseState(storeRegistry);
  const useStateAll = createUseStateAll(storeRegistry);
  const useStore = createUseStore(storeRegistry);

  return {
    useDispatcher,
    useState,
    useStateAll,
    useStore,
  };
}
