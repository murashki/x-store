import type { Payload } from './index.tsx';
import type { StoreState } from './index.tsx';

export type Reducer<
  TStoreState extends StoreState = StoreState,
  TPayload extends void | Payload = void | Payload,
> = {
  (
    state: TStoreState,
    payload: TPayload,
  ): TStoreState;
};
