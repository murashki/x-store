import type { InstanceKey } from '../InstanceKey.tsx';
import type { StoreState } from '../StoreState.tsx';
import type { UnlockedState } from '../UnlockedState.tsx';

export type ApplyState<
  TStoreState extends StoreState = StoreState,
> = {
  (
    instanceKey: InstanceKey,
    state: undefined | UnlockedState<TStoreState>,
  ): void;
};
