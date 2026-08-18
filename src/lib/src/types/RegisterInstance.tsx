import { STORE_INSTANCE_UNREGISTERED } from '../constants.tsx';
import type { InitInstance } from './InitInstance.tsx';
import type { InstanceKey } from './InstanceKey.tsx';
import type { Payload } from './Payload.tsx';

export type RegisterInstance<
  TInitPayload extends void | Payload = void | Payload,
  TResetPayload extends void | Payload = void | Payload,
> = {
  (
    initInstance: InitInstance<TInitPayload, TResetPayload>,
    instanceKey: InstanceKey,
  ): () => typeof STORE_INSTANCE_UNREGISTERED;
};
