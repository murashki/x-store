import type { ListenerAll } from './ListenerAll.tsx';
import type { StoreState } from '../StoreState.tsx';
import type { UnsubscribeAll } from './UnsubscribeAll.tsx';

export type SubscribeAll<
  TStoreState extends StoreState = StoreState,
> = {
  (
    listener: ListenerAll<TStoreState>,
  ): UnsubscribeAll
};
