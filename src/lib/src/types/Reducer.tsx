import type { InstanceKey } from './InstanceKey.tsx';
import type { Payload } from './Payload.tsx';
import type { StoreState } from './StoreState.tsx';

export type Reducer<
  TStoreState extends StoreState = StoreState,
  TPayload extends void | Payload = void | Payload,
> = {
  (
    state: TStoreState & { $$initialized: boolean, $$instanceKey: InstanceKey },
    payload: TPayload,
  ): TStoreState;
};
