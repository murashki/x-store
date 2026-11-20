import type { InstanceKey } from '../InstanceKey.tsx';
import type { StoreState } from '../StoreState.tsx';
import type { UnlockedState } from '../UnlockedState.tsx';

export type GetStateAll<
  TStoreState extends StoreState = StoreState,
> = {
  (): Record<InstanceKey, UnlockedState<TStoreState>>;
};
