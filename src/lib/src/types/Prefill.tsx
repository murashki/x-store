import type { StoreState } from './StoreState.tsx';
import type { Unlocked } from './Unlocked.tsx';

export type Prefill<
  TStoreState extends StoreState = StoreState,
> = {
  [TKey in keyof TStoreState]?: undefined | Unlocked<TStoreState[TKey]>;
};
