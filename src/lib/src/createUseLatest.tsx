// import { useCallback } from 'react';
// import { useContext } from 'react';
// import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/with-selector';
// import type { ReducerLink } from './types/index.tsx';
// import type { Reducer } from './types/index.tsx';
//
// import type { InstanceKey } from './types/index.tsx';
// import type { InitPayload } from './types/index.tsx';
// import type { ReducerMap } from './types/index.tsx';
// import type { ResetPayload } from './types/index.tsx';
// import type { RequestStateStoreKey } from './types/index.tsx';
// import type { StateLink } from './types/index.tsx';
// import type { StoreRegistry } from './types/index.tsx';
// import type { StoreState } from './types/index.tsx';
// import type { UseProp } from './types/index.tsx';
// import { DEFAULT_INSTANCE_KEY } from './constants.tsx';
// import { INTERNAL_STORE_PROPS_ACCESSOR } from './constants.tsx';
// import { InternalStore } from './InternalStore.tsx';
//
// export function createUseLatest(storeRegistry: StoreRegistry, useProp: UseProp) {
//   return function useLatest<
//     TStoreState extends StoreState = StoreState,
//     TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
//     TReducerName extends string = string,
//     TReducer extends Reducer<TStoreState, any> = Reducer<TStoreState, any>,
//   >(
//     exec: () => void,
//     reducerLink: ReducerLink<string, TStoreState, TReducerMap[`$$init`], TReducerMap[`$$reset`], TReducerName, TReducer>,
//     instanceKey?: InstanceKey,
//   ): TStoreState[TStateName] {
//     const requestState = useProp(stateLink, instanceKey);
//   };
// }
