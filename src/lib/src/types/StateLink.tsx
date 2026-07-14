import { INTERNAL_STORE_PROPS_ACCESSOR } from '../constants.tsx';
import { STATE_LINK } from '../constants.tsx';
import type { InternalStoreProps } from './index.tsx';
import type { ReducerMap } from './index.tsx';
import type { StoreState } from './index.tsx';

export type StateLink<
  TStoreName extends string = string,
  TStoreState extends StoreState = StoreState,
  TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
  TStateName extends keyof TStoreState = keyof TStoreState,
> = {
  [INTERNAL_STORE_PROPS_ACCESSOR]: InternalStoreProps<TStoreName, TStoreState, TReducerMap>;
  stateName: TStateName,
  type: typeof STATE_LINK,
};
