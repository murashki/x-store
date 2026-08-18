import type { Payload } from './Payload.tsx';
import type { ResetInstance } from './ResetInstance.tsx';

export type InitInstance<
  TInitPayload extends void | Payload = void | Payload,
  TResetPayload extends void | Payload = void | Payload,
> = {
  (
    payload: TInitPayload,
  ): ResetInstance<TResetPayload>;
};
