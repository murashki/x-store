import type { InstanceKey } from '../InstanceKey.tsx';
import type { StoreState } from '../StoreState.tsx';
import type { UninitializedStoreInstance } from '../UninitializedStoreInstance.tsx';

export type GetUninitializedInstance<
  TStoreState extends StoreState = StoreState,
> = {
  (
    instanceKey: InstanceKey,
  ): UninitializedStoreInstance<TStoreState>;
};
