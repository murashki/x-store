// import { useCallback } from 'react';
// import { useContext } from 'react';
// import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/with-selector';
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
//     TStateName extends RequestStateStoreKey<TStoreState> = RequestStateStoreKey<TStoreState>,
//   >(
//     exec: () => void,
//     stateLink: StateLink<string, TStoreState, TReducerMap[`$$init`], TReducerMap[`$$reset`], TStateName>,
//     instanceKey?: InstanceKey,
//   ): TStoreState[TStateName] {
//     const requestState = useProp(stateLink, instanceKey);
//   };
// }
