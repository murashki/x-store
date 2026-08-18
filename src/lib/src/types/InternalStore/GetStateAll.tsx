import type { InstanceKey } from '../InstanceKey.tsx';
import type { StoreState } from '../StoreState.tsx';

export type GetStateAll<
  TStoreState extends StoreState = StoreState,
> = {
  (): Record<InstanceKey, TStoreState>;
};
