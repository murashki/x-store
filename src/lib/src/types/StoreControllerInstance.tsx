import type { StoreState } from './';
import { type Payload } from './';
import { type Reducer } from './';

export type StoreControllerInstance<
  TStoreState extends StoreState = StoreState,
  TResetPayload extends void | Payload = void | Payload,
> = {
  owners: symbol[];
  resetState: (resetPayload: TResetPayload, resetReducer: Reducer<TStoreState, TResetPayload>) => void;
};
