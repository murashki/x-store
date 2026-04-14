import { createStoreRegistry } from './createStoreRegistry.tsx';

export { type InstanceKey } from './types/index.tsx';
export { DESTROY } from './constants.tsx';
export { createStore } from './createStore.tsx';
export { createStoreRegistry } from './createStoreRegistry.tsx';
export { InternalStore } from './InternalStore.tsx';
export { StoreProvider } from './StoreProvider.tsx';

export const {
  useDispatcher,
  useProp,
  usePropAll,
  useStore,
} = createStoreRegistry();
