import type { ApplyState } from './types/InternalStore/ApplyState.tsx';
import type { Dispatch } from './types/InternalStore/Dispatch.tsx';
import type { EnsureInstance } from './types/InternalStore/EnsureInstance.tsx';
import type { GetInstance } from './types/InternalStore/GetInstance.tsx';
import type { GetState } from './types/InternalStore/GetState.tsx';
import type { GetStateAll } from './types/InternalStore/GetStateAll.tsx';
import type { InitInstance } from './types/InternalStore/InitInstance.tsx';
import type { InstanceKey } from './types/InstanceKey.tsx';
import type { Listener } from './types/InternalStore/Listener.tsx';
import type { IsInitialized } from './types/InternalStore/IsInitialized.tsx';
import type { ListenerAll } from './types/InternalStore/ListenerAll.tsx';
import type { PatchState } from './types/InternalStore/PatchState.tsx';
import type { PruneInstance } from './types/InternalStore/PruneInstance.tsx';
import type { ResetInstance } from './types/InternalStore/ResetInstance.tsx';
import type { StoreInstance } from './types/StoreInstance.tsx';
import type { StoreState } from './types/StoreState.tsx';
import type { Subscribe } from './types/InternalStore/Subscribe.tsx';
import type { SubscribeAll } from './types/InternalStore/SubscribeAll.tsx';
import type { UnlockedState } from './types/UnlockedState.tsx';
import { INTERNAL_BUG_MESSAGE } from './constants.tsx';
import { isLockedOverride } from './isLockedOverride.tsx';
import { mergePrefill } from './mergePrefill.tsx';
import { unlock } from './unlock.tsx';

export class InternalStore<
  TStoreState extends StoreState = StoreState,
> {
  private readonly instances: Record<InstanceKey, StoreInstance<TStoreState>>;

  private readonly listenersAll: Set<ListenerAll<TStoreState>>;

  private readonly lockedStateNames: string[];

  public readonly name: string;

  private stateAll: Record<InstanceKey, UnlockedState<TStoreState>>;

  constructor(name: string, lockedStateNames: string[] = []) {
    this.instances = Object.create(null);
    this.listenersAll = new Set();
    this.lockedStateNames = lockedStateNames;
    this.name = name;
    this.stateAll = Object.create(null);
  }

  private applyState: ApplyState<TStoreState> = (instanceKey, state) => {
    const stateAll = Object.assign(Object.create(null), this.stateAll);
    if (state) {
      stateAll[instanceKey] = state;
    }
    else {
      delete stateAll[instanceKey];
    }
    this.stateAll = stateAll;
  };

  public dispatch: Dispatch<TStoreState> = (instanceKey, reducer, payload) => {
    this.ensureInstance(instanceKey);

    if (this.isInitialized(instanceKey)) {
      const instance = this.getInstance(instanceKey);
      const prevState = this.getState(instanceKey);
      const nextState = this.patchState(instanceKey, reducer, payload, prevState);
      this.applyState(instanceKey, nextState);

      instance.listeners.forEach((listener) => listener(instanceKey, reducer, payload));
      this.listenersAll.forEach((listener) => listener(instanceKey, reducer, payload));

      // TODO Убрать в логгер
      console.log(`dispatch [store: ${this.name}, instanceKey: ${String(instanceKey)}, action: ${reducer.name}]:`);
      // TODO Убрать в логгер
      console.log({ payload, [`prev state`]: prevState, [`next state`]: nextState });
    }
    else {
      const instance = this.getInstance(instanceKey);
      instance.deferredActions.push({ payload, reducer });
    }
  };

  private ensureInstance: EnsureInstance = (instanceKey) => {
    if ( ! this.instances[instanceKey]) {
      this.instances[instanceKey] = { deferredActions: [], listeners: new Set(), updatedLockedWarnedReducers: new Set(), wrappedUnlockedWarnedReducers: new Set() };
    }
  };

  private getInstance: GetInstance<TStoreState> = (instanceKey) => {
    const instance = this.instances[instanceKey];
    if (instance) {
      return instance;
    }
    else {
      throw new Error(`Store instance record is missing [store: ${this.name}, instanceKey: ${String(instanceKey)}]. ${INTERNAL_BUG_MESSAGE}`);
    }
  };

  public getState: GetState<TStoreState> = (instanceKey) => {
    if (this.isInitialized(instanceKey)) {
      return this.stateAll[instanceKey];
    }
    else {
      throw new Error(`Store instance is not initialized [store: ${this.name}, instanceKey: ${String(instanceKey)}]. ${INTERNAL_BUG_MESSAGE}`);
    }
  };

  public getStateAll: GetStateAll<TStoreState> = () => {
    return this.stateAll;
  };

  // TODO Охота изменить порядок параметров
  public initInstance: InitInstance<TStoreState> = (instanceKey, initReducer, unlockedInitialState, prefill = {}) => {
    this.ensureInstance(instanceKey);
    const instance = this.getInstance(instanceKey);

    if (this.isInitialized(instanceKey)) {
      throw new Error(`Store instance is already initialized [store: ${this.name}, instanceKey: ${String(instanceKey)}]. ${INTERNAL_BUG_MESSAGE}`);
    }

    // TODO Смущает наличие `prefill` в этих двух вызовах...
    //   Такое ощущение, что он должен маячить где-то в одном из них.
    // TODO Смущает наличие двух этих вызовов подряд...
    //   Такое ощущение, что надо бы обойтись одним.
    // TODO Надо спросить у ИИ что будет если от первого вызова избавиться и зачем он тут нужен
    const unlockedPrefill: StoreState = {};
    for (const stateName of Object.keys(prefill)) {
      unlockedPrefill[stateName] = unlock(prefill[stateName]);
      if (unlockedPrefill[stateName] !== prefill[stateName]) {
        console.warn(`You used \`LOCKED\` or \`OVERRIDE_LOCKED\` in prefill [store: ${this.name}, instanceKey: ${String(instanceKey)}, property: ${stateName}]. Pass an unwrapped value instead.`);
      }
    }

    this.applyState(instanceKey, mergePrefill(unlockedInitialState, unlockedPrefill));
    this.dispatch(instanceKey, initReducer, unlockedPrefill);

    // TODO Требуется комментарий в коде...
    //   Почему мы сначала сохраняем в переменную массив, и только потом идем по нему? Почему нельзя
    //   идти сразу по нему?
    const deferredActions = instance.deferredActions;
    instance.deferredActions = [];
    for (const deferredAction of deferredActions) {
      this.dispatch(instanceKey, deferredAction.reducer, deferredAction.payload);
    }
  };

  public isInitialized: IsInitialized = (instanceKey) => {
    return instanceKey in this.stateAll;
  };

  private patchState: PatchState<TStoreState> = (instanceKey, reducer, payload, prevState) => {
    const patch = reducer(prevState, payload);
    const updatedLockedStateNames: string[] = [];
    const wrappedStateNames: string[] = [];
    let nextState: StoreState = prevState;

    for (const stateName of Object.keys(patch)) {
      const value = unlock(patch[stateName]);

      if (value !== undefined) {
        if (this.lockedStateNames.includes(stateName)) {
          if ( ! isLockedOverride(patch[stateName])) {
            updatedLockedStateNames.push(stateName);
          }
        }
        else if (value !== patch[stateName]) {
          wrappedStateNames.push(stateName);
        }

        if (value !== nextState[stateName]) {
          nextState = {
            ...nextState,
            [stateName]: value,
          };
        }
      }
    }

    const instance = this.getInstance(instanceKey);

    if (updatedLockedStateNames.length && ! instance.updatedLockedWarnedReducers.has(reducer)) {
      instance.updatedLockedWarnedReducers.add(reducer);
      console.warn(`You updated a property, which is marked as locked [store: ${this.name}, instanceKey: ${String(instanceKey)}, action: ${reducer.name}, property: ${updatedLockedStateNames.join(`, `)}]. Use \`OVERRIDE_LOCKED\`, if you really need to update it.`);
    }

    if (wrappedStateNames.length && ! instance.wrappedUnlockedWarnedReducers.has(reducer)) {
      instance.wrappedUnlockedWarnedReducers.add(reducer);
      console.warn(`You used \`LOCKED\` or \`OVERRIDE_LOCKED\` for a property, which is not marked as locked [store: ${this.name}, instanceKey: ${String(instanceKey)}, action: ${reducer.name}, property: ${wrappedStateNames.join(`, `)}]. Return an unwrapped value instead.`);
    }

    return nextState as UnlockedState<TStoreState>;
  };

  private pruneInstance: PruneInstance = (instanceKey) => {
    const instance = this.getInstance(instanceKey);
    if ( ! this.isInitialized(instanceKey) && ! instance.listeners.size && ! instance.deferredActions.length) {
      delete this.instances[instanceKey];
    }
  };

  public resetInstance: ResetInstance<TStoreState> = (instanceKey, resetReducer) => {
    // TODO Сомнителен порядок вызовов всех этих инструкций, которые ниже

    const instance = this.getInstance(instanceKey);
    // TODO Сомнение: что должно нести прощальное состояние сброса и какой быть роли $$reset.
    //   Пейлоад у сброса убран, есть идеи на этот счёт, но они ещё не оформились.
    const prevState = this.getState(instanceKey);
    const nextState = this.patchState(instanceKey, resetReducer, undefined, prevState);
    this.applyState(instanceKey, undefined);
    instance.updatedLockedWarnedReducers.clear();
    instance.wrappedUnlockedWarnedReducers.clear();

    instance.listeners.forEach((listener) => listener(instanceKey, resetReducer, undefined));
    this.listenersAll.forEach((listener) => listener(instanceKey, resetReducer, undefined));

    // TODO Убрать в логгер
    console.log(`reset [store: ${this.name}, instanceKey: ${String(instanceKey)}, action: ${resetReducer.name}]:`);
    // TODO Убрать в логгер
    console.log({ [`prev state`]: prevState, [`next state`]: nextState });

    this.pruneInstance(instanceKey);
  };

  public subscribe: Subscribe<TStoreState> = (instanceKey, listener) => {
    this.ensureInstance(instanceKey);
    const instance = this.getInstance(instanceKey);

    const actualListener: Listener<TStoreState> = (...args) => listener(...args);
    instance.listeners.add(actualListener);

    return () => {
      const deleted = instance.listeners.delete(actualListener);
      if (deleted) {
        this.pruneInstance(instanceKey);
      }
      else {
        throw new Error(`Store instance listener is missing on unsubscribe [store: ${this.name}, instanceKey: ${String(instanceKey)}]. ${INTERNAL_BUG_MESSAGE}`);
      }
    };
  };

  public subscribeAll: SubscribeAll<TStoreState> = (listener) => {
    const actualListener: ListenerAll<TStoreState> = (...args) => listener(...args);
    this.listenersAll.add(actualListener);

    return () => {
      const deleted = this.listenersAll.delete(actualListener);
      if ( ! deleted) {
        throw new Error(`Store listener is missing on unsubscribe [store: ${this.name}]. ${INTERNAL_BUG_MESSAGE}`);
      }
    };
  };
}
