import { useCallback } from 'react';
import { useContext } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/with-selector';

import type { InstanceKey } from './types/InstanceKey.tsx';
import type { ReducerMap } from './types/ReducerMap.tsx';
import type { StateLink } from './types/StateLink.tsx';
import type { StoreController } from './types/StoreController.tsx';
import type { StoreRegistry } from './types/StoreRegistry.tsx';
import type { StoreState } from './types/StoreState.tsx';
import type { UseProp } from './types/UseProp.tsx';
import { DEFAULT_INSTANCE_KEY } from './constants.tsx';
import { INTERNAL_STORE_PROPS_ACCESSOR } from './constants.tsx';
import { createStoreController } from './createStoreController.tsx';

export function createUseProp(storeRegistry: StoreRegistry): UseProp {
  function subscribeEarly<
    TStoreState extends StoreState,
    TReducerMap extends ReducerMap<TStoreState>,
  >(storeController: StoreController<TStoreState, TReducerMap>, instanceKey: InstanceKey, scheduleWake: () => void): () => void {
    const earlySubscribers = storeController.earlySubscribers[instanceKey] = storeController.earlySubscribers[instanceKey] ?? [];
    earlySubscribers.push(scheduleWake);

    // Есть такой вариант, когда экземпляр хранилища может инициализироваться между рендером и
    // подпиской и тогда цикл пробуждения ранних слушателей запускающийся в момент инициализации
    // экземпляра хранилища проходит без нас. В этом случае запланируем пробуждение сами.
    if (instanceKey in storeController.instances) {
      scheduleWake();
    }

    return () => {
      const scheduleWakeIndex = earlySubscribers.indexOf(scheduleWake);
      // Свою запись удаляем только мы и только один раз, поэтому она обязана быть на месте - иначе
      // сообщение в консоль, ибо мы что-то не учли.
      if (scheduleWakeIndex === -1) {
        console.warn(`Early subscriber is missing on unsubscribe [store: ${storeController.internalStore.name}, instanceKey: ${String(instanceKey)}]. This must never happen and may mean a bug inside the library itself. Please report it to the library developers.`);
      }
      else {
        earlySubscribers.splice(scheduleWakeIndex, 1);
      }
      if (earlySubscribers.length === 0) {
        delete storeController.earlySubscribers[instanceKey];
      }
    };
  }

  return function useProp<
    TStoreState extends StoreState = StoreState,
    TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
    TStateName extends keyof TStoreState = keyof TStoreState,
  >(stateLink: StateLink<string, TStoreState, TReducerMap, TStateName>, instanceKey?: InstanceKey): TStoreState[TStateName] {
    const internalStoreProps = stateLink[INTERNAL_STORE_PROPS_ACCESSOR];
    const contextInstanceKey = useContext(internalStoreProps.context);
    const actualInstanceKey = instanceKey ?? contextInstanceKey ?? DEFAULT_INSTANCE_KEY;
    const [, setWakeState] = useState(0);

    const storeController = createStoreController(storeRegistry, internalStoreProps);

    const initialized = actualInstanceKey in storeController.instances;

    const { getSnapshot, subscribe } = useMemo(() => {
      let subscribe: (listener: () => void) => () => void;
      let getSnapshot: () => TStoreState;

      if (initialized) {
        subscribe = (listener: () => void) => {
          return storeController.internalStore.subscribe(actualInstanceKey, listener);
        };

        getSnapshot = () => {
          return storeController.internalStore.getState(actualInstanceKey);
        };
      }
      else {
        subscribe = () => {
          return subscribeEarly(storeController, actualInstanceKey, () => setWakeState(state => state + 1));
        };

        getSnapshot = () => {
          return internalStoreProps.initialState;
        };
      }

      return { getSnapshot, subscribe };
    }, [actualInstanceKey, initialized, internalStoreProps, storeController]);

    const selector = useCallback((state: TStoreState) => {
      return state[stateLink.stateName];
    }, [stateLink]);

    return useSyncExternalStoreWithSelector(
      subscribe,
      getSnapshot,
      null,
      selector,
    );
  };
}
