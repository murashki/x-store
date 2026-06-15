import { STORE_INSTANCE_UNREGISTERED } from '../constants.tsx';
import type { InitInstance } from './index.tsx';
import type { InstanceKey } from './index.tsx';
import type { Payload } from './index.tsx';

export type RegisterInstance<
  TInitPayload extends void | Payload = void | Payload,
  TResetPayload extends void | Payload = void | Payload,
> = {
  (
    initInstance: InitInstance<TInitPayload, TResetPayload>,
    instanceKey: InstanceKey,
  ): () => typeof STORE_INSTANCE_UNREGISTERED;
};
