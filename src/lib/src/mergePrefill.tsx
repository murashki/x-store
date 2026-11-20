import type { Prefill } from './types/Prefill.tsx';
import type { StoreState } from './types/StoreState.tsx';
import type { UnlockedState } from './types/UnlockedState.tsx';
import { unlock } from './unlock.tsx';

export function mergePrefill<
  TStoreState extends StoreState = StoreState,
>(
  unlockedInitialState: UnlockedState<TStoreState>,
  prefill: Prefill<TStoreState> = {},
): UnlockedState<TStoreState> {
  const state: StoreState = { ...unlockedInitialState };

  for (const stateName of Object.keys(prefill)) {
    const value = unlock(prefill[stateName]);
    if (value !== undefined) {
      state[stateName] = value;
    }
  }

  return state as UnlockedState<TStoreState>;
}
