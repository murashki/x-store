import { type Payload } from './';
import { type ResetInstance } from './';

export type InitInstance<
  TInitPayload extends void | Payload = void | Payload,
  TResetPayload extends void | Payload = void | Payload,
> = {
  (
    payload: TInitPayload,
  ): ResetInstance<TResetPayload>;
};
