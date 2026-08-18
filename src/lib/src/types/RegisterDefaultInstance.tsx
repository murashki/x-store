import { STORE_INSTANCE_UNREGISTERED } from '../constants.tsx';
import type { InitInstance } from './InitInstance.tsx';
import type { Payload } from './Payload.tsx';

export type RegisterDefaultInstance<
  TInitPayload extends void | Payload = void | Payload,
  TResetPayload extends void | Payload = void | Payload,
> = {
  (
    initInstance: InitInstance<TInitPayload, TResetPayload>,
    instanceKey: void,
  ): () => typeof STORE_INSTANCE_UNREGISTERED;
};
