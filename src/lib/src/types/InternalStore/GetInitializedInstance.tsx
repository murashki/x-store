import type { InitializedStoreInstance } from '../InitializedStoreInstance.tsx';
import type { InstanceKey } from '../InstanceKey.tsx';
import type { StoreState } from '../StoreState.tsx';

export type GetInitializedInstance<
  TStoreState extends StoreState = StoreState,
> = {
  (
    instanceKey: InstanceKey,
  ): InitializedStoreInstance<TStoreState>;
};
