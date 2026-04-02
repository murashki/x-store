import { STORE_INSTANCE_UNREGISTERED } from '../constants.tsx';
import { type InitInstance } from './';
import { type Payload } from './';

export type RegisterDefaultInstance<
  TInitPayload extends void | Payload = void | Payload,
  TResetPayload extends void | Payload = void | Payload,
> = {
  (
    initInstance: InitInstance<TInitPayload, TResetPayload>,
    instanceKey: void,
  ): () => typeof STORE_INSTANCE_UNREGISTERED;
};
