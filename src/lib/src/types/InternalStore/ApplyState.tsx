import type { InstanceKey } from '../InstanceKey.tsx';
import type { StoreState } from '../StoreState.tsx';

export type ApplyState<
  TStoreState extends StoreState = StoreState,
> = {
  (
    instanceKey: InstanceKey,
    state: undefined | TStoreState,
  ): void;
};
