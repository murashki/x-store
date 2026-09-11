import type { InstanceKey } from '../InstanceKey.tsx';
import type { Payload } from '../Payload.tsx';
import type { Reducer } from '../Reducer.tsx';
import type { StoreState } from '../StoreState.tsx';

export type Dispatch<
  TStoreState extends StoreState = StoreState,
> = {
  <
    TPayload extends void | Payload = void | Payload,
  >(
    instanceKey: InstanceKey,
    reducer: Reducer<TStoreState, TPayload>,
    payload: TPayload,
  ): void
};
