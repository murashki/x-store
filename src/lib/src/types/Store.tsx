import { INTERNAL_STORE_PROPS_ACCESSOR } from '../constants.tsx';
import type { InternalStoreProps } from './InternalStoreProps.tsx';
import type { ReducerMap } from './ReducerMap.tsx';
import type { ReducerLink } from './ReducerLink.tsx';
import type { StateLink } from './StateLink.tsx';
import type { StoreState } from './StoreState.tsx';

export type Store<
  TStoreName extends string = string,
  TStoreState extends StoreState = StoreState,
  TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
> =
  & {
    [INTERNAL_STORE_PROPS_ACCESSOR]: InternalStoreProps<TStoreName, TStoreState, TReducerMap>;
    $$init: void;
    $$reset: void;
  }
  & {
    [TKey in keyof TStoreState]: TKey extends string
      ? StateLink<TStoreName, TStoreState, TReducerMap, TKey>
      : never;
  }
  & {
    [TKey in keyof TReducerMap]: TKey extends string
      ? TKey extends keyof TStoreState
        ? never
        : ReducerLink<TStoreName, TStoreState, TReducerMap, TKey>
      : never;
  };
