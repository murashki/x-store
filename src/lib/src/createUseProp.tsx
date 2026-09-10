import { useCallback } from 'react';
import { useContext } from 'react';
import { useMemo } from 'react';
import { useRef } from 'react';
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
import { INITIALIZED_STATE_NAME } from './constants.tsx';
import { INSTANCE_KEY_STATE_NAME } from './constants.tsx';
import { INTERNAL_STORE_PROPS_ACCESSOR } from './constants.tsx';
import { createStoreController } from './createStoreController.tsx';

export function createUseProp(storeRegistry: StoreRegistry): UseProp {
  function subscribeWake<
    TStoreState extends StoreState,
  >(storeController: StoreController<TStoreState>, instanceKey: InstanceKey, initialized: boolean, scheduleWake: () => void): () => void {
    const wakeCallbacks = storeController.wakeCallbacks[instanceKey] = storeController.wakeCallbacks[instanceKey] ?? [];
    wakeCallbacks.push(scheduleWake);

    // Есть такой вариант, когда экземпляр хранилища может инициализироваться или сброситься между
    // рендером и подпиской и тогда цикл пробуждения подписчиков, запускающийся в момент
    // инициализации или сброса экземпляра, проходит без нас. В этом случае запланируем
    // пробуждение сами.
    if ((instanceKey in storeController.instances) !== initialized) {
      scheduleWake();
    }

    return () => {
      const scheduleWakeIndex = wakeCallbacks.indexOf(scheduleWake);
      // Свою запись удаляем только мы и только один раз, поэтому она обязана быть на месте - иначе
      // сообщение в консоль, ибо мы что-то не учли.
      if (scheduleWakeIndex === -1) {
        console.warn(`Wake callback is missing on unsubscribe [store: ${storeController.internalStore.name}, instanceKey: ${String(instanceKey)}]. This must never happen and may mean a bug inside the library itself. Please report it to the library developers.`);
      }
      else {
        wakeCallbacks.splice(scheduleWakeIndex, 1);
      }
      if (wakeCallbacks.length === 0) {
        delete storeController.wakeCallbacks[instanceKey];
      }
    };
  }

  return function useProp<
    TStoreState extends StoreState = StoreState,
    TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
    TStateName extends keyof TStoreState = keyof TStoreState,
  >(stateLink: StateLink<string, TStoreState, TReducerMap, TStateName>, instanceKey?: InstanceKey): TStoreState[TStateName] {
    const stateLinkRef = useRef<{ stateLink: StateLink<string, TStoreState, TReducerMap, TStateName> }>({ stateLink });

    if (stateLinkRef.current.stateLink !== stateLink) {
      console.warn(`State link reference mismatch. You must pass the same state link on every render.`);
    }

    const actualStateLink = stateLinkRef.current.stateLink;
    const serviceLink = actualStateLink.stateName === INITIALIZED_STATE_NAME || actualStateLink.stateName === INSTANCE_KEY_STATE_NAME;
    const internalStoreProps = actualStateLink[INTERNAL_STORE_PROPS_ACCESSOR];
    const storeContextValue = useContext(internalStoreProps.context);
    const actualInstanceKey = instanceKey ?? storeContextValue?.instanceKey ?? DEFAULT_INSTANCE_KEY;
    const [, setWakeState] = useState(0);

    const storeController = createStoreController(storeRegistry, internalStoreProps);

    const initialized = actualInstanceKey in storeController.instances;

    // TODO Сомнение: склейка prefill с initialState происходит в каждом useProp под провайдером,
    //   хотя StoreProvider мог бы склеить один раз и класть в контекст уже готовое состояние.
    //   Как надо на самом деле, ещё не решено.
    const uninitializedState = useMemo<TStoreState>(() => {
      if (instanceKey == null && storeContextValue?.prefill != null) {
        return { ...internalStoreProps.initialState, ...storeContextValue.prefill };
      }
      else {
        return internalStoreProps.initialState;
      }
    }, [instanceKey, internalStoreProps, storeContextValue]);

    const { getSnapshot, subscribe } = useMemo(() => {
      let subscribe: (listener: () => void) => () => void;
      let getSnapshot: () => TStoreState;

      const scheduleWake = () => setWakeState((state) => state + 1);

      if (initialized && ! serviceLink) {
        subscribe = (listener: () => void) => {
          const unsubscribeStore = storeController.internalStore.subscribe(actualInstanceKey, listener);
          const unsubscribeWake = subscribeWake(storeController, actualInstanceKey, initialized, scheduleWake);
          return () => {
            unsubscribeStore();
            unsubscribeWake();
          };
        };

        getSnapshot = () => {
          return storeController.internalStore.getState(actualInstanceKey) ?? uninitializedState;
        };
      }
      else {
        subscribe = () => {
          return subscribeWake(storeController, actualInstanceKey, initialized, scheduleWake);
        };

        getSnapshot = () => {
          return uninitializedState;
        };
      }

      return { getSnapshot, subscribe };
    }, [actualInstanceKey, initialized, serviceLink, storeController, uninitializedState]);

    const selector = useCallback((state: TStoreState) => {
      return state[actualStateLink.stateName];
    }, [actualStateLink]);

    const prop = useSyncExternalStoreWithSelector(
      subscribe,
      getSnapshot,
      null,
      selector,
    );

    if (actualStateLink.stateName === INITIALIZED_STATE_NAME) {
      return initialized as TStoreState[TStateName];
    }
    else if (actualStateLink.stateName === INSTANCE_KEY_STATE_NAME) {
      return actualInstanceKey as TStoreState[TStateName];
    }
    else {
      return prop;
    }
  };
}
