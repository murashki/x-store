import type { Locked } from './Locked.tsx';
import type { LockedOverride } from './LockedOverride.tsx';
import type { StoreState } from './StoreState.tsx';

export type Patch<
  TStoreState extends StoreState = StoreState,
> = {
  [TKey in keyof TStoreState]?: undefined | (
    TStoreState[TKey] extends Locked<infer TValue>
      ? LockedOverride<TValue>
      : TStoreState[TKey]
  );
};
