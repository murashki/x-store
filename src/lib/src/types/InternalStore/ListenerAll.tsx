import type { InstanceKey } from '../InstanceKey.tsx';
import type { Payload } from '../Payload.tsx';
import type { Reducer } from '../Reducer.tsx';
import type { StoreState } from '../StoreState.tsx';

export type ListenerAll<
  TStoreState extends StoreState = StoreState,
> = {
  <
    TPayload extends void | Payload = void | Payload,
    TReducer extends Reducer<TStoreState, TPayload> = Reducer<TStoreState, TPayload>,
  >(
    instanceKey: InstanceKey,
    payload: TPayload,
    reducer: TReducer,
  ): void;
};
