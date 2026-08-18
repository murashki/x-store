import type { InstanceKey } from '../InstanceKey.tsx';
import type { Payload } from '../Payload.tsx';
import type { Reducer } from '../Reducer.tsx';
import type { ResetInstance } from './ResetInstance.tsx';
import type { StoreState } from '../StoreState.tsx';

export type InitInstance<
  TStoreState extends StoreState = StoreState,
  TInitPayload extends void | Payload = void | Payload,
  TResetPayload extends void | Payload = void | Payload,
> = {
  (
    instanceKey: InstanceKey,
    initialState: TStoreState,
    initPayload: TInitPayload,
    initReducer: Reducer<TStoreState, TInitPayload>,
  ): ResetInstance<TStoreState, TResetPayload>;
};
