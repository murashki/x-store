import { type Payload } from './';
import { type StoreState } from './';

export type Reducer<
  TStoreState extends StoreState = StoreState,
  TPayload extends void | Payload = void | Payload,
> = {
  (
    state: TStoreState,
    payload: TPayload,
  ): TStoreState;
};
