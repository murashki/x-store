import type { InstanceKey } from './types/InstanceKey.tsx';
import type { StoreState } from './types/StoreState.tsx';

export function pickPropAll<
  TStoreState extends StoreState = StoreState,
  TStateName extends keyof TStoreState = keyof TStoreState,
>(
  stateAll: Record<InstanceKey, TStoreState>,
  stateName: TStateName,
  instanceKeys?: InstanceKey[] | ((state: TStoreState) => boolean),
): [instanceKey: InstanceKey, state: TStoreState[TStateName]][] {
  let actualInstanceKeys: InstanceKey[];
  if (instanceKeys == null) {
    actualInstanceKeys = [...Object.keys(stateAll), ...Object.getOwnPropertySymbols(stateAll)];
  }
  else if (typeof instanceKeys === `function`) {
    actualInstanceKeys = [...Object.keys(stateAll), ...Object.getOwnPropertySymbols(stateAll)].filter((instanceKey) => {
      return instanceKeys(stateAll[instanceKey]);
    });
  }
  else {
    actualInstanceKeys = instanceKeys.filter((instanceKey) => {
      return instanceKey in stateAll;
    });
  }

  return actualInstanceKeys.map((instanceKey): [instanceKey: InstanceKey, state: TStoreState[TStateName]] => {
    return [instanceKey, stateAll[instanceKey][stateName]];
  });
}
