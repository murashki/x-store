import type { Payload } from './Payload.tsx';
import type { StoreState } from './StoreState.tsx';

export type Reducer<
  TStoreState extends StoreState = StoreState,
  TPayload extends void | Payload = void | Payload,
> = {
  (
    state: TStoreState & { $$initialized: boolean },
    payload: TPayload,
  ): TStoreState;
};
