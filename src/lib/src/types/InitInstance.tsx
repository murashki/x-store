import type { Payload } from './index.tsx';
import type { ResetInstance } from './index.tsx';

export type InitInstance<
  TInitPayload extends void | Payload = void | Payload,
  TResetPayload extends void | Payload = void | Payload,
> = {
  (
    payload: TInitPayload,
  ): ResetInstance<TResetPayload>;
};
