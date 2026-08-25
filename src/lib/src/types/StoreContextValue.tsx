import type { InstanceKey } from './InstanceKey.tsx';
import type { StoreState } from './StoreState.tsx';

export type StoreContextValue<
  TStoreState extends StoreState = StoreState,
> = {
  instanceKey: InstanceKey;
  prefill?: Partial<TStoreState>;
};
