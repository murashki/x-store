import type { DeferredAction } from './DeferredAction.tsx';
import type { Listener } from './InternalStore/Listener.tsx';
import type { StoreState } from './StoreState.tsx';

export type StoreInstance<
  TStoreState extends StoreState = StoreState,
> = {
  deferredActions: DeferredAction<TStoreState>[];
  listeners: Set<Listener<TStoreState>>;
  state: undefined | TStoreState;
};
