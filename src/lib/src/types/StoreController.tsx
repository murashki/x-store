import { InternalStore } from '../InternalStore.tsx';
import type { InstanceKey } from './InstanceKey.tsx';
import type { ReducerMap } from './ReducerMap.tsx';
import type { StoreInstanceController } from './StoreInstanceController.tsx';
import type { StoreState } from './StoreState.tsx';

export type StoreController<
  TStoreState extends StoreState = StoreState,
  TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
> = {
  internalStore: InternalStore<TStoreState, TReducerMap>;
  instances: Record<InstanceKey, StoreInstanceController<TStoreState, Parameters<TReducerMap[`$$reset`]>[1]>>;
  earlySubscribers: Record<InstanceKey, (() => void)[]>;
};
