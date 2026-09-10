import type { Dispatch } from './types/InternalStore/Dispatch.tsx';
import type { GetState } from './types/InternalStore/GetState.tsx';
import type { GetStateAll } from './types/InternalStore/GetStateAll.tsx';
import type { InitInstance } from './types/InternalStore/InitInstance.tsx';
import type { InstanceKey } from './types/InstanceKey.tsx';
import type { Listener } from './types/InternalStore/Listener.tsx';
import type { ListenerAll } from './types/InternalStore/ListenerAll.tsx';
import type { ResetInstance } from './types/InternalStore/ResetInstance.tsx';
import type { StoreState } from './types/StoreState.tsx';
import type { Subscribe } from './types/InternalStore/Subscribe.tsx';
import type { SubscribeAll } from './types/InternalStore/SubscribeAll.tsx';

export class InternalStore<
  TStoreState extends StoreState = StoreState,
> {
  private readonly listeners: Record<InstanceKey, Set<Listener<TStoreState>>>;

  private readonly listenersAll: Set<ListenerAll<TStoreState>>;

  public readonly name: string;

  private state: Record<InstanceKey, TStoreState>;

  constructor(name: string) {
    this.listeners = Object.create(null) as Record<InstanceKey, Set<Listener<TStoreState>>>;
    this.listenersAll = new Set();
    this.name = name;
    this.state = Object.create(null) as Record<InstanceKey, TStoreState>;
  }

  public getState: GetState<TStoreState> = (instanceKey) => {
    return this.state[instanceKey];
  };

  public getStateAll: GetStateAll<TStoreState> = () => {
    return this.state;
  };

  public initInstance: InitInstance<TStoreState> = (instanceKey, initialState, prefill, initReducer) => {
    // TODO От множественной инициализации было решено отказаться. Следует кидать предупреждение.
    this.state = Object.assign(Object.create(null), this.state, { [instanceKey]: { ...(this.state[instanceKey] ?? initialState), ...prefill } });
    this.dispatch(instanceKey, prefill ?? {}, initReducer);
  };

  public resetInstance: ResetInstance<TStoreState> = (instanceKey, resetReducer) => {
    // TODO Сомнение: что должно нести прощальное состояние сброса и какой быть роли $$reset.
    //   Пейлоад у сброса убран, есть идеи на этот счёт, но они ещё не оформились.
    const instanceState = this.state[instanceKey];
    const instanceResetState = resetReducer(instanceState, undefined);

    const stateRest = Object.assign(Object.create(null), this.state) as Record<InstanceKey, TStoreState>;
    delete stateRest[instanceKey];
    this.state = stateRest;

    this.listeners[instanceKey]?.forEach((listener) => listener(instanceKey, undefined, resetReducer));
    this.listenersAll.forEach((listener) => listener(instanceKey, undefined, resetReducer));

    // TODO Убрать в логгер
    console.log(`reset [store: ${this.name}, instanceKey: ${String(instanceKey)}, action: ${resetReducer.name}]:`);
    // TODO Убрать в логгер
    console.log({ [`prev state`]: instanceState, [`reset state`]: instanceResetState });
  };

  public subscribe: Subscribe<TStoreState> = (instanceKey, listener) => {
    const listeners = this.listeners[instanceKey] = this.listeners[instanceKey] ?? new Set();
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
      if (listeners.size === 0) {
        delete this.listeners[instanceKey];
      }
    };
  };

  public subscribeAll: SubscribeAll<TStoreState> = (listener) => {
    const listenersAll = this.listenersAll.add(listener);
    return () => {
      listenersAll.delete(listener);
    };
  };

  public dispatch: Dispatch<TStoreState> = (instanceKey, payload, reducer) => {
    const instanceState = this.state[instanceKey];
    const instanceNextState = reducer(instanceState, payload);

    this.state = Object.assign(Object.create(null), this.state, { [instanceKey]: instanceNextState });

    // Реестр слушателей существует только пока есть хотя бы одна подписка, а dispatch может
    // легально вызываться, когда реальных слушателей может не быть ни одного. Отсутствие
    // реестра здесь штатно - ставим `?`.
    this.listeners[instanceKey]?.forEach((listener) => listener(instanceKey, payload, reducer));
    this.listenersAll.forEach((listener) => listener(instanceKey, payload, reducer));

    // TODO Убрать в логгер
    console.log(`dispatch [store: ${this.name}, instanceKey: ${String(instanceKey)}, action: ${reducer.name}]:`);
    // TODO Убрать в логгер
    console.log({ payload, [`prev state`]: instanceState, [`next state`]: instanceNextState });
  };
}
