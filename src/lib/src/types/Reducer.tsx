import type { Patch } from './Patch.tsx';
import type { Payload } from './Payload.tsx';
import type { StoreState } from './StoreState.tsx';
import type { UnlockedState } from './UnlockedState.tsx';

export type Reducer<
  TStoreState extends StoreState = StoreState,
  TPayload extends void | Payload = void | Payload,
> = {
  (
    state: UnlockedState<TStoreState>,
    payload: TPayload,
  ): Patch<TStoreState>;
};
