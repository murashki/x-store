import type { InstanceKey } from '../InstanceKey.tsx';
import type { StoreInstance } from '../StoreInstance.tsx';
import type { StoreState } from '../StoreState.tsx';

export type GetInstance<
  TStoreState extends StoreState = StoreState,
> = {
  (
    instanceKey: InstanceKey,
  ): StoreInstance<TStoreState>;
};
