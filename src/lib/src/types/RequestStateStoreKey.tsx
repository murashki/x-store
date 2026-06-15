import type { RequestState } from './RequestState.tsx';
import type { StoreState } from './StoreState.tsx';

export type RequestStateStoreKey<
  TStoreState extends StoreState = StoreState,
> = {
  [TKey in keyof TStoreState]: TStoreState[TKey] extends RequestState ? TKey : never;
}[keyof TStoreState]
