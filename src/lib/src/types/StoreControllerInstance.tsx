import type { StoreState } from './index.tsx';
import type { Payload } from './index.tsx';
import type { Reducer } from './index.tsx';

export type StoreControllerInstance<
  TStoreState extends StoreState = StoreState,
  TResetPayload extends void | Payload = void | Payload,
> = {
  owners: symbol[];
  resetState: (resetPayload: TResetPayload, resetReducer: Reducer<TStoreState, TResetPayload>) => void;
};
