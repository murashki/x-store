import type { StoreState } from './StoreState.tsx';
import type { Unlocked } from './Unlocked.tsx';

export type UnlockedState<
  TStoreState extends StoreState = StoreState,
> = {
  [TKey in keyof TStoreState]: Unlocked<TStoreState[TKey]>;
};
