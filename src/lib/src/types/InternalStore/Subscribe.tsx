import type { InstanceKey } from '../InstanceKey.tsx';
import type { Listener } from './Listener.tsx';
import type { StoreState } from '../StoreState.tsx';
import type { Unsubscribe } from './Unsubscribe.tsx';

export type Subscribe<
  TStoreState extends StoreState = StoreState,
> = {
  (
    instanceKey: InstanceKey,
    listener: Listener<TStoreState>,
  ): Unsubscribe
};
