import { INTERNAL_STORE_PROPS_ACCESSOR } from '../constants.tsx';
import { STATE_LINK } from '../constants.tsx';
import type { InternalStoreProps } from './InternalStoreProps.tsx';
import type { ReducerMap } from './ReducerMap.tsx';
import type { StoreState } from './StoreState.tsx';

export type InitializedStateLink<
  TStoreName extends string = string,
  TStoreState extends StoreState = StoreState,
  TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
> = {
  [INTERNAL_STORE_PROPS_ACCESSOR]: InternalStoreProps<TStoreName, TStoreState, TReducerMap>;
  stateName: `$$initialized`,
  type: typeof STATE_LINK,
};
