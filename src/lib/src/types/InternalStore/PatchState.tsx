import type { InstanceKey } from '../InstanceKey.tsx';
import type { Payload } from '../Payload.tsx';
import type { Reducer } from '../Reducer.tsx';
import type { StoreState } from '../StoreState.tsx';
import type { UnlockedState } from '../UnlockedState.tsx';

export type PatchState<
  TStoreState extends StoreState = StoreState,
> = {
  <
    TPayload extends void | Payload = void | Payload,
  >(
    instanceKey: InstanceKey,
    reducer: Reducer<TStoreState, TPayload>,
    payload: TPayload,
    prevState: UnlockedState<TStoreState>,
  ): UnlockedState<TStoreState>;
};
