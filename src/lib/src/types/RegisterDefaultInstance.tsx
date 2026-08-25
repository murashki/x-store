import { STORE_INSTANCE_UNREGISTERED } from '../constants.tsx';
import type { InitInstance } from './InitInstance.tsx';
import type { StoreState } from './StoreState.tsx';

export type RegisterDefaultInstance<
  TStoreState extends StoreState = StoreState,
> = {
  (
    initInstance: InitInstance<TStoreState>,
    instanceKey: void,
  ): () => typeof STORE_INSTANCE_UNREGISTERED;
};
