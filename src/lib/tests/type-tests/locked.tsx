import type { InstanceKey } from '../../src';
import type { Locked } from '../../src';
import type { Patch } from '../../src';
import { createStore } from '../../src';
import { createStoreRegistry } from '../../src';
import { LOCKED } from '../../src';
import { OVERRIDE_LOCKED } from '../../src';

{
  type State = { lockedProp: Locked<string>, prop: string };
  const initialState: State = { lockedProp: LOCKED(``), prop: `` };
  createStore(``, initialState, {
    $$init: () => ({}),
    $$reset: () => ({}),
  });
}

{
  type State = { lockedProp: Locked<string>, prop: string };
  // @ts-expect-error
  const initialState: State = { lockedProp: ``, prop: `` };
  ((_initialState: State) => null)(initialState);
}

{
  type State = { lockedProp: Locked<string>, prop: string };
  // @ts-expect-error
  const initialState: State = { lockedProp: LOCKED(0), prop: `` };
  ((_initialState: State) => null)(initialState);
}

{
  type State = { lockedProp: Locked<string>, prop: string };
  // @ts-expect-error
  const initialState: State = { lockedProp: OVERRIDE_LOCKED(``), prop: `` };
  ((_initialState: State) => null)(initialState);
}

{
  const initialState = { lockedProp: LOCKED(``), prop: `` };
  ((_lockedProp: Locked<string>) => null)(initialState.lockedProp);
  // @ts-expect-error
  ((_lockedProp: Locked<number>) => null)(initialState.lockedProp);
}

{
  type State = { lockedProp: Locked<null | string>, prop: null | string };
  const initialStateA: State = { lockedProp: LOCKED(null), prop: null };
  const initialStateB: State = { lockedProp: LOCKED(``), prop: `` };
  createStore(``, initialStateA, {
    $$init: () => ({}),
    $$reset: () => ({}),
  });
  createStore(``, initialStateB, {
    $$init: () => ({}),
    $$reset: () => ({}),
  });
}

{
  type State = { prop?: string };
  const initialState: State = { prop: `` };
  createStore(
    ``,
    // @ts-expect-error
    initialState,
    {
      $$init: () => ({}),
      $$reset: () => ({}),
    },
  );
}

{
  type State = { prop: undefined | string };
  const initialState: State = { prop: `` };
  createStore(
    ``,
    // @ts-expect-error
    initialState,
    {
      $$init: () => ({}),
      $$reset: () => ({}),
    },
  );
}

{
  type State = { lockedProp: Locked<undefined | string> };
  const initialState: State = { lockedProp: LOCKED(``) };
  createStore(
    ``,
    // @ts-expect-error
    initialState,
    {
      $$init: () => ({}),
      $$reset: () => ({}),
    },
  );
}

{
  type State = { propA: any, propB: unknown };
  const initialState: State = { propA: ``, propB: `` };
  createStore(``, initialState, {
    $$init: () => ({}),
    $$reset: () => ({}),
  });
}

{
  type State = { lockedProp: Locked<string>, prop: string };
  const initialState: State = { lockedProp: LOCKED(``), prop: `` };
  createStore(``, initialState, {
    $$init: () => ({}),
    $$reset: () => ({}),
    reducer: (state): Patch<State> => {
      ((_lockedProp: string) => null)(state.lockedProp);
      // @ts-expect-error
      ((_lockedProp: number) => null)(state.lockedProp);
      // @ts-expect-error
      ((_lockedProp: string) => null)(state.lockedProp.value);
      return { prop: state.lockedProp };
    },
  });
}

{
  type State = { lockedProp: Locked<string>, prop: string };
  const initialState: State = { lockedProp: LOCKED(``), prop: `` };
  createStore(``, initialState, {
    $$init: () => ({}),
    $$reset: () => ({}),
    reducerA: () => ({}),
    reducerB: () => ({ prop: `` }),
    reducerC: () => ({ lockedProp: OVERRIDE_LOCKED(``) }),
    reducerD: (state, payload: { lockedProp: string }) => ({ lockedProp: OVERRIDE_LOCKED(payload.lockedProp) }),
    reducerE: (state, payload: { valid: boolean }) => ({ prop: payload.valid ? `` : undefined }),
    reducerF: (state, payload: { valid: boolean }) => ({ lockedProp: payload.valid ? OVERRIDE_LOCKED(``) : undefined }),
    reducerG: (): Patch<State> => ({ lockedProp: OVERRIDE_LOCKED(``), prop: `` }),
  });
}

{
  type State = { lockedProp: Locked<string>, prop: string };
  const initialState: State = { lockedProp: LOCKED(``), prop: `` };
  createStore(``, initialState, {
    $$init: () => ({}),
    $$reset: () => ({}),
    // @ts-expect-error
    reducer: () => ({ lockedProp: `` }),
  });
}

{
  type State = { lockedProp: Locked<string>, prop: string };
  const initialState: State = { lockedProp: LOCKED(``), prop: `` };
  createStore(``, initialState, {
    $$init: () => ({}),
    $$reset: () => ({}),
    // @ts-expect-error
    reducer: (state) => ({ ...state }),
  });
}

{
  type State = { lockedProp: Locked<string>, prop: string };
  const initialState: State = { lockedProp: LOCKED(``), prop: `` };
  createStore(``, initialState, {
    $$init: () => ({}),
    $$reset: () => ({}),
    // @ts-expect-error
    reducer: (state) => state,
  });
}

{
  type State = { lockedProp: Locked<string>, prop: string };
  const initialState: State = { lockedProp: LOCKED(``), prop: `` };
  createStore(``, initialState, {
    $$init: () => ({}),
    $$reset: () => ({}),
    // @ts-expect-error
    reducer: () => ({ lockedProp: LOCKED(``) }),
  });
}

{
  type State = { lockedProp: Locked<string>, prop: string };
  const initialState: State = { lockedProp: LOCKED(``), prop: `` };
  createStore(``, initialState, {
    $$init: () => ({}),
    $$reset: () => ({}),
    // @ts-expect-error
    reducer: () => ({ lockedProp: OVERRIDE_LOCKED(0) }),
  });
}

{
  // @ts-expect-error
  OVERRIDE_LOCKED(undefined);
  OVERRIDE_LOCKED(null);
  OVERRIDE_LOCKED(``);
}

{
  type State = { lockedProp: Locked<string>, prop: string };
  const initialState: State = { lockedProp: LOCKED(``), prop: `` };
  createStore(``, initialState, {
    $$init: () => ({}),
    $$reset: () => ({}),
    // @ts-expect-error
    reducer: (): State => initialState,
  });
}

{
  type State = { lockedProp: Locked<string>, prop: string };
  const initialState: State = { lockedProp: LOCKED(``), prop: `` };
  createStore(``, initialState, {
    // @ts-expect-error
    $$init: (state) => state,
    $$reset: () => ({}),
  });
  createStore(``, initialState, {
    $$init: () => ({}),
    // @ts-expect-error
    $$reset: (state) => state,
  });
}

{
  type State = { lockedProp: Locked<string>, prop: string };
  const initialState: State = { lockedProp: LOCKED(``), prop: `` };
  createStore(``, initialState, {
    $$init: (state, payload) => {
      ((_lockedProp: undefined | string) => null)(payload.lockedProp);
      // @ts-expect-error
      ((_lockedProp: undefined | number) => null)(payload.lockedProp);
      return { prop: payload.lockedProp };
    },
    $$reset: () => ({}),
  });
}

{
  type State = { propA: string, propB: number };
  const initialState: State = { propA: ``, propB: 0 };
  createStore(``, initialState, {
    $$init: (state) => state,
    $$reset: (state) => ({ ...state }),
    reducerA: (state): State => ({ ...state, propA: `` }),
    reducerB: (): Patch<State> => ({ propA: `` }),
    reducerC: () => ({ propB: 0 }),
  });
}

{
  const { useProp } = createStoreRegistry();
  type State = { lockedProp: Locked<string>, prop: string };
  const initialState: State = { lockedProp: LOCKED(``), prop: `` };
  const store = createStore(``, initialState, {
    $$init: () => ({}),
    $$reset: () => ({}),
  });
  const lockedProp = useProp(store.lockedProp);
  ((_lockedProp: string) => null)(lockedProp);
  // @ts-expect-error
  ((_lockedProp: number) => null)(lockedProp);
  ((_lockedProp: Locked<string>) => null)(
    // @ts-expect-error
    lockedProp,
  );
}

{
  const { useProp } = createStoreRegistry();
  type State = { lockedProp: Locked<null | string>, prop: string };
  const initialState: State = { lockedProp: LOCKED(null), prop: `` };
  const store = createStore(``, initialState, {
    $$init: () => ({}),
    $$reset: () => ({}),
  });
  const lockedProp = useProp(store.lockedProp);
  ((_lockedProp: null | string) => null)(lockedProp);
  // @ts-expect-error
  ((_lockedProp: string) => null)(lockedProp);
}

{
  const { usePropAll } = createStoreRegistry();
  type State = { lockedProp: Locked<string>, prop: string };
  const initialState: State = { lockedProp: LOCKED(``), prop: `` };
  const store = createStore(``, initialState, {
    $$init: () => ({}),
    $$reset: () => ({}),
  });
  const lockedPropAll = usePropAll(store.lockedProp);
  ((_lockedPropAll: [InstanceKey, string][]) => null)(lockedPropAll);
  // @ts-expect-error
  ((_lockedPropAll: [InstanceKey, number][]) => null)(lockedPropAll);
  ((_lockedPropAll: [InstanceKey, Locked<string>][]) => null)(
    // @ts-expect-error
    lockedPropAll,
  );
  usePropAll(store.lockedProp, (state) => state.lockedProp === ``);
  // @ts-expect-error
  usePropAll(store.lockedProp, (state) => state.lockedProp.value === ``);
}

{
  const { usePropSelector } = createStoreRegistry();
  type State = { lockedProp: Locked<string>, prop: string };
  const initialState: State = { lockedProp: LOCKED(``), prop: `` };
  const store = createStore(``, initialState, {
    $$init: () => ({}),
    $$reset: () => ({}),
  });
  const selectLockedProp = usePropSelector(store.lockedProp);
  ((_selectLockedProp: () => string) => null)(selectLockedProp);
  // @ts-expect-error
  ((_selectLockedProp: () => number) => null)(selectLockedProp);
  ((_selectLockedProp: () => Locked<string>) => null)(
    // @ts-expect-error
    selectLockedProp,
  );
}

{
  const { usePropSelectorAll } = createStoreRegistry();
  type State = { lockedProp: Locked<string>, prop: string };
  const initialState: State = { lockedProp: LOCKED(``), prop: `` };
  const store = createStore(``, initialState, {
    $$init: () => ({}),
    $$reset: () => ({}),
  });
  const selectLockedPropAll = usePropSelectorAll(store.lockedProp);
  ((_selectLockedPropAll: () => [InstanceKey, string][]) => null)(selectLockedPropAll);
  // @ts-expect-error
  ((_selectLockedPropAll: () => [InstanceKey, number][]) => null)(selectLockedPropAll);
  ((_selectLockedPropAll: () => [InstanceKey, Locked<string>][]) => null)(
    // @ts-expect-error
    selectLockedPropAll,
  );
  usePropSelectorAll(store.lockedProp, (state) => state.lockedProp === ``);
  // @ts-expect-error
  usePropSelectorAll(store.lockedProp, (state) => state.lockedProp.value === ``);
}

{
  const { useStore } = createStoreRegistry();
  type State = { lockedProp: Locked<string>, prop: string };
  const initialState: State = { lockedProp: LOCKED(``), prop: `` };
  const store = createStore(``, initialState, {
    $$init: () => ({}),
    $$reset: () => ({}),
  });
  useStore(store, (init) => {
    return init({ lockedProp: `` });
  });
  useStore(store, (init) => {
    return init({ lockedProp: undefined, prop: undefined });
  });
  useStore(store, (init) => {
    // @ts-expect-error
    return init({ lockedProp: 0 });
  });
  useStore(store, (init) => {
    // @ts-expect-error
    return init({ lockedProp: LOCKED(``) });
  });
}

{
  const { StoreProvider } = createStoreRegistry();
  type State = { lockedProp: Locked<string>, prop: string };
  const initialState: State = { lockedProp: LOCKED(``), prop: `` };
  const store = createStore(``, initialState, {
    $$init: () => ({}),
    $$reset: () => ({}),
  });
  <StoreProvider prefill={{ lockedProp: `` }} store={store} />;
  // @ts-expect-error
  <StoreProvider prefill={{ lockedProp: 0 }} store={store} />;
}

{
  type State = { prop: undefined };
  const initialState: State = { prop: undefined };
  createStore(
    ``,
    // @ts-expect-error
    initialState,
    {
      $$init: () => ({}),
      $$reset: () => ({}),
    },
  );
}

{
  const initialState = { lockedProp: OVERRIDE_LOCKED(``), prop: `` };
  createStore(
    ``,
    // @ts-expect-error
    initialState,
    {
      $$init: () => ({}),
      $$reset: () => ({}),
    },
  );
}

{
  type State = { lockedProp: Locked<string>, prop: string };
  const initialState: State = { lockedProp: LOCKED(``), prop: `` };
  createStore(``, initialState, {
    $$init: () => ({}),
    $$reset: () => ({}),
    // @ts-expect-error
    reducer: () => ({ prop: LOCKED(``) }),
  });
  createStore(``, initialState, {
    $$init: () => ({}),
    $$reset: () => ({}),
    // @ts-expect-error
    reducer: () => ({ prop: OVERRIDE_LOCKED(``) }),
  });
}

{
  const { useStore } = createStoreRegistry();
  type State = { lockedProp: Locked<string>, prop: string };
  const initialState: State = { lockedProp: LOCKED(``), prop: `` };
  const store = createStore(``, initialState, {
    $$init: () => ({}),
    $$reset: () => ({}),
  });
  useStore(store, (init) => {
    // @ts-expect-error
    return init({ lockedProp: OVERRIDE_LOCKED(``) });
  });
  useStore(store, (init) => {
    // @ts-expect-error
    return init({ prop: LOCKED(``) });
  });
  useStore(store, (init) => {
    // @ts-expect-error
    return init({ prop: OVERRIDE_LOCKED(``) });
  });
}

{
  const { StoreProvider } = createStoreRegistry();
  type State = { lockedProp: Locked<string>, prop: string };
  const initialState: State = { lockedProp: LOCKED(``), prop: `` };
  const store = createStore(``, initialState, {
    $$init: () => ({}),
    $$reset: () => ({}),
  });
  <StoreProvider prefill={{ lockedProp: undefined, prop: undefined }} store={store} />;
  // @ts-expect-error
  <StoreProvider prefill={{ lockedProp: LOCKED(``) }} store={store} />;
  // @ts-expect-error
  <StoreProvider prefill={{ lockedProp: OVERRIDE_LOCKED(``) }} store={store} />;
  // @ts-expect-error
  <StoreProvider prefill={{ prop: OVERRIDE_LOCKED(``) }} store={store} />;
}
