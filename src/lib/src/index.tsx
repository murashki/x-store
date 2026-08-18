import { createStoreRegistry } from './createStoreRegistry.tsx';

export { type InstanceKey } from './types/InstanceKey.tsx';
export { type RequestState } from './types/RequestState.tsx';
export { type RequestAbortedState } from './types/RequestState/RequestAbortedState.tsx';
export { type RequestFulfilledState } from './types/RequestState/RequestFulfilledState.tsx';
export { type RequestIdleState } from './types/RequestState/RequestIdleState.tsx';
export { type RequestPendingState } from './types/RequestState/RequestPendingState.tsx';
export { type RequestRejectedState } from './types/RequestState/RequestRejectedState.tsx';
export { DESTROY } from './constants.tsx';
export { createStore } from './createStore.tsx';
export { createStoreRegistry } from './createStoreRegistry.tsx';
export { InternalStore } from './InternalStore.tsx';
export { requestState } from './requestState.tsx';
export { requestStatus } from './requestStatus.tsx';
export { StoreProvider } from './StoreProvider.tsx';

export const {
  useDispatcher,
  useProp,
  usePropAll,
  useStore,
} = createStoreRegistry();
