import { INTERNAL_STORE_PROPS_ACCESSOR } from '../constants.tsx';
import { REDUCER_LINK } from '../constants.tsx';
import type { InternalStoreProps } from './InternalStoreProps.tsx';
import type { Reducer } from './Reducer.tsx';
import type { ReducerMap } from './ReducerMap.tsx';
import type { ReducerPayload } from './ReducerPayload.tsx';
import type { StoreState } from './StoreState.tsx';

export type ReducerLink<
  TStoreName extends string = string,
  TStoreState extends StoreState = StoreState,
  TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
  TReducerName extends string = string,
> = {
  [INTERNAL_STORE_PROPS_ACCESSOR]: InternalStoreProps<TStoreName, TStoreState, TReducerMap>;
  reducer: Reducer<TStoreState, ReducerPayload<TReducerMap[TReducerName]>>,
  reducerName: TReducerName,
  type: typeof REDUCER_LINK,
};
