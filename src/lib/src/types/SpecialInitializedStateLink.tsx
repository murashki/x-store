import { INITIALIZED_STATE_NAME } from '../constants.tsx';
import { INTERNAL_STORE_PROPS_ACCESSOR } from '../constants.tsx';
import { STATE_LINK_FLAG } from '../constants.tsx';
import type { InternalStoreProps } from './InternalStoreProps.tsx';
import type { ReducerMap } from './ReducerMap.tsx';
import type { StoreState } from './StoreState.tsx';

export type SpecialInitializedStateLink<
  TStoreName extends string = string,
  TStoreState extends StoreState = StoreState,
  TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
> = {
  [INTERNAL_STORE_PROPS_ACCESSOR]: InternalStoreProps<TStoreName, TStoreState, TReducerMap>;
  stateName: typeof INITIALIZED_STATE_NAME,
  type: typeof STATE_LINK_FLAG,
};
