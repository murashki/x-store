import type { InstanceKey } from './InstanceKey.tsx';
import type { Payload } from './Payload.tsx';

export type Dispatcher<
  TPayload extends void | Payload = void | Payload,
> = {
  (
    payload: TPayload,
  ): void;
  (
    instanceKey: InstanceKey,
    payload: TPayload,
  ): void;
};
