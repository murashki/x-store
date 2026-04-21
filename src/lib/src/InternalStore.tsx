import { type InstanceKey } from './types/index.tsx';
import { type Payload } from './types/index.tsx';
import { type Reducer } from './types/index.tsx';
import { type StoreState } from './types/index.tsx';

export type Dispatch<
  TStoreState extends StoreState = StoreState,
> = {
  <
    TPayload extends Payload = Payload,
  >(
    instanceKey: InstanceKey,
    payload: TPayload,
    reducer: Reducer<TStoreState, TPayload>,
  ): void
};

export type GetSnapshot<
  TStoreState extends StoreState = StoreState,
> = {
  (
    instanceKey: InstanceKey,
  ): TStoreState;
};

export type GetSnapshotAll<
  TStoreState extends StoreState = StoreState,
> = {
  (): Record<symbol | string, TStoreState>;
};

export type Listener = {
  (): void;
};

export type ListenerAll = {
  (): void;
};

export type Subscribe = {
  (
    instanceKey: InstanceKey,
    listener: Listener,
  ): Unsubscribe
};

export type Unsubscribe = {
  (): void;
};

export type SubscribeAll = {
  (
    listener: ListenerAll,
  ): UnsubscribeAll
};

export type UnsubscribeAll = {
  (): void;
};

export type Update<
  TStoreState extends StoreState = StoreState,
> = {
  (
    instanceKey: InstanceKey,
    newState: TStoreState,
  ): void;
};

export type InitInstance<
  TStoreState extends StoreState = StoreState,
  TInitPayload extends void | Payload = void | Payload,
  TResetPayload extends void | Payload = void | Payload,
> = {
  (
    instanceKey: InstanceKey,
    initialState: TStoreState,
    initPayload: TInitPayload,
    initReducer: Reducer<TStoreState, TInitPayload>,
  ): ResetInstance<TStoreState, TResetPayload>;
};

export type ResetInstance<
  TStoreState extends StoreState = StoreState,
  TResetPayload extends void | Payload = void | Payload,
> = {
  (
    resetPayload: TResetPayload,
    resetReducer: Reducer<TStoreState, TResetPayload>,
  ): void;
};

export type GetState<
  TStoreState extends StoreState = StoreState,
> = {
  (
    instanceKey: InstanceKey,
  ): TStoreState;
};

export type GetStateAll<
  TStoreState extends StoreState = StoreState,
> = {
  (): Record<InstanceKey, TStoreState>;
};

export class InternalStore<
  TStoreState extends StoreState = StoreState,
  TInitPayload extends void | Payload = void | Payload,
  TResetPayload extends void | Payload = void | Payload,
> {
  private listeners: Record<InstanceKey, Set<Listener>>;

  private listenersAll: Set<ListenerAll>;
  public name: string;

  private state: Record<InstanceKey, TStoreState>;

  constructor(name: string) {
    this.listeners = {};
    this.listenersAll = new Set();
    this.name = name;
    this.state = {};
  }

  public getStateAll: GetStateAll<TStoreState> = () => {
    return this.state;
  };

  public getState: GetState<TStoreState> = (instanceKey) => {
    return this.state[instanceKey];
  };

  public initInstance: InitInstance<TStoreState, TInitPayload, TResetPayload> = (instanceKey, initialState, initPayload, initReducer) => {
    const initState = initReducer(initialState, initPayload);
    this.state = {
      ...this.state,
      [instanceKey]: initState,
    };
    // TODO Убрать в логгер
    console.log(`initInstance [store: ${this.name}, instance: ${String(instanceKey)}]:`);
    console.dir(this.state);
    return (resetPayload, resetReducer) => {
      const resetState = resetReducer(initState, resetPayload);
      // TODO Тут место для уничтожения состояния экземпляра хранилища через `delete this.state[instanceKey];`
      this.state = { ...this.state, [instanceKey]: resetState };
      // TODO Убрать в логгер
      console.log(`resetInstance [store: ${this.name}, instance: ${String(instanceKey)}]:`);
      console.dir(this.state);
    }
  };

  public subscribe: Subscribe = (instanceKey, listener) => {
    if ( ! this.listeners[instanceKey]) {
      this.listeners[instanceKey] = new Set();
    }
    this.listeners[instanceKey].add(listener);
    return () => {
      this.listeners[instanceKey].delete(listener);
      if (this.listeners[instanceKey].size === 0) {
        delete this.listeners[instanceKey];
      }
    };
  };

  public subscribeAll: SubscribeAll = (listener) => {
    this.listenersAll.add(listener);
    return () => {
      this.listenersAll.delete(listener);
    };
  };

  public getSnapshot: GetSnapshot<TStoreState> = (instanceKey) => {
    return this.state[instanceKey];
  };

  public getSnapshotAll: GetSnapshotAll<TStoreState> = () => {
    return this.state;
  };

  public dispatch: Dispatch<TStoreState> = (instanceKey, payload, reducer) => {
    const instanceState = this.state[instanceKey];
    const changes = reducer(instanceState, payload);
    this.update(instanceKey, changes);
    // TODO Убрать в логгер
    console.log(`dispatch [store: ${this.name}, instance: ${String(instanceKey)}, action: ${reducer.name}]:`);
    console.dir({ payload, [`prev state`]: instanceState, [`next state`]: changes });
  };

  public update: Update<TStoreState> = (instanceKey, changes) => {
    this.state = { ...this.state, [instanceKey]: changes };
    this.listeners[instanceKey].forEach((listener) => listener());
    this.listenersAll.forEach((listener) => listener());
  };
}
