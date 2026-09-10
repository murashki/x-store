import { InternalStore } from '../InternalStore.tsx';
import type { DeferredAction } from './DeferredAction.tsx';
import type { InstanceKey } from './InstanceKey.tsx';
import type { StoreInstanceController } from './StoreInstanceController.tsx';
import type { StoreState } from './StoreState.tsx';

export type StoreController<
  TStoreState extends StoreState = StoreState,
> = {
  deferredActions: Record<InstanceKey, DeferredAction<TStoreState>[]>;
  instances: Record<InstanceKey, StoreInstanceController>;
  internalStore: InternalStore<TStoreState>;
  wakeCallbacks: Record<InstanceKey, (() => void)[]>;
};
