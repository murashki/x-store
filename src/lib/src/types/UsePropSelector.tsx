import type { InitializedStateLink } from './InitializedStateLink.tsx';
import type { InstanceKey } from './InstanceKey.tsx';
import type { InstanceKeyStateLink } from './InstanceKeyStateLink.tsx';
import type { ReducerMap } from './ReducerMap.tsx';
import type { StateLink } from './StateLink.tsx';
import type { StoreState } from './StoreState.tsx';

export type UsePropSelector = {
  <
    TStoreState extends StoreState = StoreState,
    TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
  >(
    stateLink: InitializedStateLink<string, TStoreState, TReducerMap>,
    instanceKey?: InstanceKey,
  ): () => boolean;
  <
    TStoreState extends StoreState = StoreState,
    TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
  >(
    stateLink: InstanceKeyStateLink<string, TStoreState, TReducerMap>,
    instanceKey?: InstanceKey,
  ): () => InstanceKey;
  <
    TStoreState extends StoreState = StoreState,
    TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
    TStateName extends keyof TStoreState = keyof TStoreState,
  >(
    stateLink: StateLink<string, TStoreState, TReducerMap, TStateName>,
    instanceKey?: InstanceKey,
  ): () => TStoreState[TStateName];
};
