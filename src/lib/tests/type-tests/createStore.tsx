import type { InstanceKey } from '../../src';
import { createStore } from '../../src';

{
  // @ts-expect-error
  createStore();
}

{
  // @ts-expect-error
  createStore(``);
}

{
  type State = { prop: string };
  const initialState: State = { prop: `` };
  // @ts-expect-error
  createStore(``, initialState);
}

{
  type State = { prop: string };
  const initialState: State = { prop: `` };
  createStore(``, initialState, {
    $$init: () => ({}),
    $$reset: () => ({}),
  });
}

{
  type State = { prop: string };
  const initialState: State = { prop: `` };
  // @ts-expect-error
  createStore(null, initialState, {
    $$init: () => ({}),
    $$reset: () => ({}),
  });
}

{
  // @ts-expect-error
  createStore(``, null, {
    $$init: () => ({}),
    $$reset: () => ({}),
  });
}

{
  type State = { prop: string };
  const initialState: State = { prop: `` };
  // @ts-expect-error
  createStore(``, initialState, null);
}

{
  type State = { prop: string };
  const initialState: State = { prop: `` };
  // @ts-expect-error
  createStore(``, initialState, {
    $$reset: () => ({}),
  });
}

{
  type State = { prop: string };
  const initialState: State = { prop: `` };
  // @ts-expect-error
  createStore(``, initialState, {
    $$init: () => ({}),
  });
}

{
  type State = { prop: string };
  const initialState: State = { prop: `` };
  createStore(``, initialState, {
    // @ts-expect-error
    $$init: (state, payload: State) => ({ ...payload }),
    $$reset: () => ({}),
  });
}

{
  type State = { prop: string };
  const initialState: State = { prop: `` };
  createStore(``, initialState, {
    $$init: (state, payload: Partial<State>) => ({ ...payload }),
    $$reset: () => ({}),
  });
}

{
  type State = { prop: string };
  const initialState: State = { prop: `` };
  createStore(``, initialState, {
    // @ts-expect-error
    $$init: (state, payload: string) => ({ prop: payload }),
    $$reset: () => ({}),
  });
}

{
  type State = { prop: string };
  const initialState: State = { prop: `` };
  createStore(``, initialState, {
    // @ts-expect-error
    $$init: () => null,
    $$reset: () => ({}),
  });
}

{
  type State = { prop: string };
  const initialState: State = { prop: `` };
  createStore(``, initialState, {
    $$init: () => ({}),
    // @ts-expect-error
    $$reset: (state, payload: Partial<State>) => ({ ...payload }),
  });
}

{
  type State = { prop: string };
  const initialState: State = { prop: `` };
  createStore(``, initialState, {
    $$init: () => ({}),
    // @ts-expect-error
    $$reset: (state, payload: string) => ({ prop: payload }),
  });
}

{
  type State = { prop: string };
  const initialState: State = { prop: `` };
  createStore(``, initialState, {
    $$init: () => ({}),
    // @ts-expect-error
    $$reset: () => null,
  });
}

{
  type State = { prop: string };
  const initialState: State = { prop: `` };
  createStore(``, initialState, {
    $$init: () => ({}),
    $$reset: () => ({}),
    // @ts-expect-error
    prop: () => ({}),
  });
}

{
  type State = { prop: string };
  const initialState: State = { prop: `` };
  createStore(``, initialState, {
    $$init: () => ({}),
    $$reset: () => ({}),
    reducer: () => ({}),
  });
}

{
  type State = { prop: string };
  const initialState: State = { prop: `` };
  createStore(``, initialState, {
    $$init: () => ({}),
    $$reset: () => ({}),
    reducer: (state, payload: { prop: string }) => ({ prop: payload.prop }),
  });
}

{
  type State = { prop: string };
  const initialState: State = { prop: `` };
  createStore(``, initialState, {
    $$init: () => ({}),
    $$reset: () => ({}),
    // @ts-expect-error
    reducer: (state, payload: string) => ({ prop: payload }),
  });
}

{
  type State = { prop: string };
  const initialState: State = { prop: `` };
  createStore(``, initialState, {
    $$init: () => ({}),
    $$reset: () => ({}),
    // @ts-expect-error
    reducer: (state, payload: string[]) => ({ prop: payload[0] }),
  });
}

{
  type State = { prop: string };
  const initialState: State = { prop: `` };
  createStore(``, initialState, {
    $$init: () => ({}),
    $$reset: () => ({}),
    // @ts-expect-error
    reducer: (state, payload?: { prop: string }) => ({ prop: payload?.prop }),
  });
}

{
  type State = { prop: string };
  const initialState: State = { prop: `` };
  createStore(``, initialState, {
    $$init: () => ({}),
    $$reset: () => ({}),
    // @ts-expect-error
    reducer: (state, payload: string | { prop: string }) => ({ prop: String(payload) }),
  });
}

{
  type State = { prop: string };
  const initialState: State = { prop: `` };
  createStore(``, initialState, {
    $$init: () => ({}),
    $$reset: () => ({}),
    // @ts-expect-error
    reducer: (state, payload: null) => ({ prop: String(payload) }),
  });
}

{
  type State = { prop: string };
  const initialState: State = { prop: `` };
  createStore(``, initialState, {
    $$init: () => ({}),
    $$reset: () => ({}),
    reducerA: (state, payload: { propA: string } | { propB: string }) => ({ prop: String(payload) }),
    reducerB: (state, payload: { prop?: string }) => ({ prop: payload.prop }),
    reducerC: (state, payload: void) => ({ prop: String(payload) }),
    reducerD: (state) => ({ prop: state.prop }),
    reducerE: () => ({}),
  });
}

{
  type State = { prop: string };
  const initialState: State = { prop: `` };
  createStore(``, initialState, {
    $$init: () => ({}),
    $$reset: () => ({}),
    // @ts-expect-error
    reducer: () => null,
  });
}

{
  type State = { prop: string };
  const initialState: State = { prop: `` };
  createStore(``, initialState, {
    $$init: () => ({}),
    $$reset: () => ({}),
    // @ts-expect-error
    reducer: 0,
  });
}

{
  type State = { prop: string };
  const initialState: State = { prop: `` };
  const store = createStore(``, initialState, {
    $$init: () => ({}),
    $$reset: () => ({}),
    reducer: () => ({}),
  });
  ((_value: void) => null)(store.$$init);
  ((_value: void) => null)(store.$$reset);
  // @ts-expect-error
  ((_value: void) => null)(store.prop);
  // @ts-expect-error
  ((_value: void) => null)(store.reducer);
}

{
  type State = { $$initialized: boolean, prop: string };
  const initialState: State = { $$initialized: false, prop: `` };
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
  type State = { prop: string };
  const initialState: State = { prop: `` };
  createStore(``, initialState, {
    $$init: () => ({}),
    // @ts-expect-error
    $$initialized: () => ({}),
    $$reset: () => ({}),
  });
}

{
  type State = { prop: string };
  const initialState: State = { prop: `` };
  createStore(``, initialState, {
    $$init: (state) => {
      // @ts-expect-error
      ((_initialized: boolean) => null)(state.$$initialized);
      return {};
    },
    $$reset: (state) => {
      // @ts-expect-error
      ((_initialized: boolean) => null)(state.$$initialized);
      return {};
    },
    reducer: (state) => {
      // @ts-expect-error
      ((_initialized: boolean) => null)(state.$$initialized);
      return {};
    },
  });
}

{
  type State = { $$instanceKey: string, prop: string };
  const initialState: State = { $$instanceKey: ``, prop: `` };
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
  type State = { prop: string };
  const initialState: State = { prop: `` };
  createStore(``, initialState, {
    $$init: () => ({}),
    // @ts-expect-error
    $$instanceKey: () => ({}),
    $$reset: () => ({}),
  });
}

{
  type State = { prop: string };
  const initialState: State = { prop: `` };
  createStore(``, initialState, {
    $$init: (state) => {
      // @ts-expect-error
      ((_instanceKey: InstanceKey) => null)(state.$$instanceKey);
      return {};
    },
    $$reset: (state) => {
      // @ts-expect-error
      ((_instanceKey: InstanceKey) => null)(state.$$instanceKey);
      return {};
    },
    reducer: (state) => {
      // @ts-expect-error
      ((_instanceKey: InstanceKey) => null)(state.$$instanceKey);
      return {};
    },
  });
}
