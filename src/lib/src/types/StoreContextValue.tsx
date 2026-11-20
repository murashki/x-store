import type { InstanceKey } from './InstanceKey.tsx';
import type { StoreState } from './StoreState.tsx';
import type { UnlockedState } from './UnlockedState.tsx';

export type StoreContextValue<
  TStoreState extends StoreState = StoreState,
> = {
  instanceKey: InstanceKey;
  uninitializedState: UnlockedState<TStoreState>;
};
