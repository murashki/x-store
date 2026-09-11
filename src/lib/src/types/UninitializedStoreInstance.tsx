import type { StoreInstance } from './StoreInstance.tsx';
import type { StoreState } from './StoreState.tsx';

export type UninitializedStoreInstance<
  TStoreState extends StoreState = StoreState,
> = Omit<StoreInstance<TStoreState>, `state`> & {
  state: undefined;
};
