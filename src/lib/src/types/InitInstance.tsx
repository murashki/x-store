import type { ResetInstance } from './ResetInstance.tsx';
import type { StoreState } from './StoreState.tsx';

export type InitInstance<
  TStoreState extends StoreState = StoreState,
> = {
  (
    prefill?: Partial<TStoreState>,
  ): ResetInstance;
};
