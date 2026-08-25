import { STORE_INSTANCE_UNREGISTERED } from '../constants.tsx';
import type { InitInstance } from './InitInstance.tsx';
import type { InstanceKey } from './InstanceKey.tsx';
import type { StoreState } from './StoreState.tsx';

export type RegisterInstance<
  TStoreState extends StoreState = StoreState,
> = {
  (
    initInstance: InitInstance<TStoreState>,
    instanceKey: InstanceKey,
  ): () => typeof STORE_INSTANCE_UNREGISTERED;
};
