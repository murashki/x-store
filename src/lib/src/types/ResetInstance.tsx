import { STORE_INSTANCE_UNREGISTERED } from '../constants.tsx';
import { type Payload } from './';

export type ResetInstance<
  TPayload extends void | Payload = void | Payload,
> = {
  (
    payload: TPayload,
  ): typeof STORE_INSTANCE_UNREGISTERED;
};
