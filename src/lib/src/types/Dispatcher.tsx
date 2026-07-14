import type { InstanceKey } from './index.tsx';
import type { Payload } from './index.tsx';

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
