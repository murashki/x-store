import type { InstanceKey } from './InstanceKey.tsx';
import type { ReducerMap } from './ReducerMap.tsx';
import type { StateLink } from './StateLink.tsx';
import type { StoreState } from './StoreState.tsx';

// TODO Сомнение: usePropAll на уровне типов не принимает служебные ссылки $$initialized и
//   $$instanceKey, хотя в рантайме эти ключи в состояниях экземпляров есть. Нужна ли перегрузка
//   по образцу UseProp, не решено.
export type UsePropAll = {
  <
    TStoreState extends StoreState = StoreState,
    TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
    TStateName extends keyof TStoreState = keyof TStoreState,
  >(
    stateLink: StateLink<string, TStoreState, TReducerMap, TStateName>,
    instanceKeys?: InstanceKey[] | ((state: TStoreState) => boolean),
  ): [instanceKey: InstanceKey, state: TStoreState[TStateName]][];
};
