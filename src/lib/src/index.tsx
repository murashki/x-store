import { createStoreRegistry } from './createStoreRegistry.tsx';

export { type InstanceKey } from './types/index.tsx';
export { type RequestState } from './types/index.tsx';
export { type RequestAbortedState } from './types/RequestState/RequestAbortedState.ts';
export { type RequestFulfilledState } from './types/RequestState/RequestFulfilledState.ts';
export { type RequestIdleState } from './types/RequestState/RequestIdleState.ts';
export { type RequestPendingState } from './types/RequestState/RequestPendingState.ts';
export { type RequestRejectedState } from './types/RequestState/RequestRejectedState.ts';
export { DESTROY } from './constants.tsx';
export { createStore } from './createStore.tsx';
export { createStoreRegistry } from './createStoreRegistry.tsx';
export { InternalStore } from './InternalStore.tsx';
export { requestState } from './requestState.ts';
export { requestStatus } from './requestStatus.ts';
export { StoreProvider } from './StoreProvider.tsx';

export const {
  useDispatcher,
  useProp,
  usePropAll,
  useStore,
} = createStoreRegistry();
