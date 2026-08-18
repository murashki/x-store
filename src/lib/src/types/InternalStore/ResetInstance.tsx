import type { Payload } from '../Payload.tsx';
import type { Reducer } from '../Reducer.tsx';
import type { StoreState } from '../StoreState.tsx';

export type ResetInstance<
  TStoreState extends StoreState = StoreState,
  TResetPayload extends void | Payload = void | Payload,
> = {
  (
    resetPayload: TResetPayload,
    resetReducer: Reducer<TStoreState, TResetPayload>,
  ): void;
};
