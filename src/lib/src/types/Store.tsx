import { INTERNAL_STORE_PROPS_ACCESSOR } from '../constants.tsx';
import { type InternalStoreProps } from './';
import { type ReducerMap } from './';
import { type ReducerLink } from './';
import { type StateLink } from './';
import { type StoreState } from './';

export type Store<
  TStoreName extends string = string,
  TStoreState extends StoreState = StoreState,
  TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
> =
  & {
    [INTERNAL_STORE_PROPS_ACCESSOR]: InternalStoreProps<TStoreName, TStoreState, TReducerMap[`$$init`], TReducerMap[`$$reset`]>;
  }
  & {
    [`$$init`]: void;
    [`$$reset`]: void;
  }
  & {
    [TKey in Extract<keyof TStoreState, string>]: StateLink<TStoreName, TStoreState, TReducerMap[`$$init`], TReducerMap[`$$reset`], TKey>;
  }
  & {
    [TKey in Extract<keyof TReducerMap, string>]: TKey extends keyof TStoreState
      ? never
      : ReducerLink<TStoreName, TStoreState, TReducerMap[`$$init`], TReducerMap[`$$reset`], TKey, TReducerMap[TKey]>;
  };
