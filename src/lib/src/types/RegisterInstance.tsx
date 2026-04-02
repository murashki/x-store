import { STORE_INSTANCE_UNREGISTERED } from '../constants.tsx';
import { type InitInstance } from './';
import { type InstanceKey } from './';
import { type Payload } from './';

export type RegisterInstance<
  TInitPayload extends void | Payload = void | Payload,
  TResetPayload extends void | Payload = void | Payload,
> = {
  (
    initInstance: InitInstance<TInitPayload, TResetPayload>,
    instanceKey: InstanceKey,
  ): () => typeof STORE_INSTANCE_UNREGISTERED;
};
