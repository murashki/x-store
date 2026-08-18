import type { Dispatch } from './types/InternalStore/Dispatch.tsx';
import type { GetState } from './types/InternalStore/GetState.tsx';
import type { GetStateAll } from './types/InternalStore/GetStateAll.tsx';
import type { InitInstance } from './types/InternalStore/InitInstance.tsx';
import type { InitPayload } from './types/InitPayload.tsx';
import type { InstanceKey } from './types/InstanceKey.tsx';
import type { Listener } from './types/InternalStore/Listener.tsx';
import type { ListenerAll } from './types/InternalStore/ListenerAll.tsx';
import type { ReducerMap } from './types/ReducerMap.tsx';
import type { ResetPayload } from './types/ResetPayload.tsx';
import type { StoreState } from './types/StoreState.tsx';
import type { Subscribe } from './types/InternalStore/Subscribe.tsx';
import type { SubscribeAll } from './types/InternalStore/SubscribeAll.tsx';

export class InternalStore<
  TStoreState extends StoreState = StoreState,
  TReducerMap extends ReducerMap<TStoreState> = ReducerMap<TStoreState>,
> {
  private listeners: Record<InstanceKey, Set<Listener<TStoreState>>>;

  private listenersAll: Set<ListenerAll<TStoreState>>;

  public name: string;

  private state: Record<InstanceKey, TStoreState>;

  constructor(name: string) {
    this.listeners = {};
    this.listenersAll = new Set();
    this.name = name;
    this.state = {};
  }

  public getState: GetState<TStoreState> = (instanceKey) => {
    return this.state[instanceKey];
  };

  public getStateAll: GetStateAll<TStoreState> = () => {
    return this.state;
  };

  public initInstance: InitInstance<TStoreState, InitPayload<TReducerMap>, ResetPayload<TReducerMap>> = (instanceKey, initialState, initPayload, initReducer) => {
    // TODO От множественной инициализации было решено отказаться. Надо кинуть предупреждение.
    this.state = { ...this.state, [instanceKey]: this.state[instanceKey] ?? initialState };
    // TODO От множественной инициализации было решено отказаться. Надо кинуть предупреждение.
    this.listeners[instanceKey] = this.listeners[instanceKey] ?? new Set();

    this.dispatch(instanceKey, initPayload, initReducer);

    return (resetPayload, resetReducer) => {
      this.dispatch(instanceKey, resetPayload, resetReducer);
      // TODO Тут место для уничтожения состояния экземпляра хранилища через `delete this.state[instanceKey];`
    }
  };

  public subscribe: Subscribe<TStoreState> = (instanceKey, listener) => {
    this.listeners[instanceKey].add(listener);
    return () => {
      this.listeners[instanceKey].delete(listener);
      if (this.listeners[instanceKey].size === 0) {
        delete this.listeners[instanceKey];
      }
    };
  };

  public subscribeAll: SubscribeAll<TStoreState> = (listener) => {
    this.listenersAll.add(listener);
    return () => {
      this.listenersAll.delete(listener);
    };
  };

  public dispatch: Dispatch<TStoreState> = (instanceKey, payload, reducer) => {
    const instanceState = this.state[instanceKey];
    const instanceNextState = reducer(instanceState, payload);

    this.state = { ...this.state, [instanceKey]: instanceNextState };

    this.listeners[instanceKey].forEach((listener) => listener(instanceKey, payload, reducer));
    this.listenersAll.forEach((listener) => listener(instanceKey, payload, reducer));

    // TODO Убрать в логгер
    console.log(`dispatch [store: ${this.name}, instanceKey: ${String(instanceKey)}, action: ${reducer.name}]:`);
    // TODO Убрать в логгер
    console.log({ payload, [`prev state`]: instanceState, [`next state`]: instanceNextState });
  };
}
