import { InternalStore } from '../InternalStore.tsx';
import type { InstanceKey } from './InstanceKey.tsx';
import type { StoreInstanceController } from './StoreInstanceController.tsx';
import type { StoreState } from './StoreState.tsx';

export type StoreController<
  TStoreState extends StoreState = StoreState,
> = {
  internalStore: InternalStore<TStoreState>;
  instances: Record<InstanceKey, StoreInstanceController<TStoreState>>;
  earlySubscribers: Record<InstanceKey, (() => void)[]>;
};
