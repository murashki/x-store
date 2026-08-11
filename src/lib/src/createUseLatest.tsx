import type { InstanceKey } from './types/index.tsx';
import type { Reducer } from './types/index.tsx';
import type { ReducerLink } from './types/index.tsx';
import type { ReducerMap } from './types/index.tsx';
import type { StoreRegistry } from './types/index.tsx';
import type { StoreState } from './types/index.tsx';

type Saga<
  TActionName extends string = string,
  TPayload extends any = any,
  TContext extends any = any,
> = {
  (
    actionName: TActionName,
    payload: TPayload,
    ctx: TContext,
  ): void;
};

export function createUseLatest(storeRegistry: StoreRegistry) {
  return function useLatest<
    TStoreState extends StoreState = StoreState,
    TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
    TReducerName extends string = string,
    TReducer extends Reducer<TStoreState, any> = Reducer<TStoreState, any>,
  >(
    saga: Saga<TReducerName>,
    reducerLinks: ReducerLink<string, TStoreState, TReducerMap, TReducerName>[],
    instanceKey?: InstanceKey,
  ): any {
    return;
  };
}
