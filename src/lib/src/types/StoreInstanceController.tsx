import type { StoreState } from './StoreState.tsx';
import type { Payload } from './Payload.tsx';
import type { Reducer } from './Reducer.tsx';

export type StoreInstanceController<
  TStoreState extends StoreState = StoreState,
  TResetPayload extends void | Payload = void | Payload,
> = {
  owners: symbol[];
  resetState: (resetPayload: TResetPayload, resetReducer: Reducer<TStoreState, TResetPayload>) => void;
};
