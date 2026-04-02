import { InternalStore } from '../InternalStore.tsx';
import { type InstanceKey } from './';
import { type ReducerMap } from './';
import { type StoreControllerInstance } from './StoreControllerInstance.tsx';
import { type StoreState } from './';

export type StoreController<
  TStoreState extends StoreState = StoreState,
  TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
> = {
  internalStore: InternalStore<TStoreState, Parameters<TReducerMap[`$$init`]>[1], Parameters<TReducerMap[`$$reset`]>[1]>;
  instances: Record<InstanceKey, StoreControllerInstance<TStoreState, Parameters<TReducerMap[`$$reset`]>[1]>>;
};
