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
    $$init: (state) => state,
    $$reset: (state) => state,
  });
}

{
  type State = { prop: string };
  const initialState: State = { prop: `` };
  // @ts-expect-error
  createStore(null, initialState, {
    $$init: (state) => state,
    $$reset: (state) => state,
  });
}

{
  // @ts-expect-error
  createStore(``, null, {
    $$init: (state: any) => state,
    $$reset: (state: any) => state,
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
    $$reset: (state) => state,
  });
}

{
  type State = { prop: string };
  const initialState: State = { prop: `` };
  // @ts-expect-error
  createStore(``, initialState, {
    $$init: (state) => state,
  });
}

{
  type State = { prop: string };
  const initialState: State = { prop: `` };
  createStore(``, initialState, {
    $$init: (state, payload: { prop: string }) => ({ ...state, prop: payload.prop }),
    $$reset: (state) => state,
  });
}

{
  type State = { prop: string };
  const initialState: State = { prop: `` };
  createStore(``, initialState, {
    // @ts-expect-error
    $$init: (state, payload: string) => ({ ...state, prop: payload }),
    $$reset: (state) => state,
  });
}

{
  type State = { prop: string };
  const initialState: State = { prop: `` };
  createStore(``, initialState, {
    // @ts-expect-error
    $$init: () => null,
    $$reset: (state) => state,
  });
}

{
  type State = { prop: string };
  const initialState: State = { prop: `` };
  createStore(``, initialState, {
    $$init: (state) => state,
    $$reset: (state, payload: { prop: string }) => ({ ...state, prop: payload.prop }),
  });
}

{
  type State = { prop: string };
  const initialState: State = { prop: `` };
  createStore(``, initialState, {
    $$init: (state) => state,
    // @ts-expect-error
    $$reset: (state, payload: string) => ({ ...state, prop: payload }),
  });
}

{
  type State = { prop: string };
  const initialState: State = { prop: `` };
  createStore(``, initialState, {
    $$init: (state) => state,
    // @ts-expect-error
    $$reset: () => null,
  });
}

{
  type State = { prop: string };
  const initialState: State = { prop: `` };
  createStore(``, initialState, {
    $$init: (state) => state,
    $$reset: (state) => state,
    // @ts-expect-error
    prop: (state) => ({ ...state }),
  });
}

{
  type State = { prop: string };
  const initialState: State = { prop: `` };
  createStore(``, initialState, {
    $$init: (state) => state,
    $$reset: (state) => state,
    reducer: (state) => ({ ...state }),
  });
}

{
  type State = { prop: string };
  const initialState: State = { prop: `` };
  createStore(``, initialState, {
    $$init: (state) => state,
    $$reset: (state) => state,
    reducer: (state, payload: { prop: string }) => ({ ...state, prop: payload.prop }),
  });
}

{
  type State = { prop: string };
  const initialState: State = { prop: `` };
  createStore(``, initialState, {
    $$init: (state) => state,
    $$reset: (state) => state,
    // @ts-expect-error
    reducer: (state, payload: string) => ({ ...state, prop: payload }),
  });
}

{
  type State = { prop: string };
  const initialState: State = { prop: `` };
  createStore(``, initialState, {
    $$init: (state) => state,
    $$reset: (state) => state,
    // @ts-expect-error
    reducer: () => null,
  });
}

{
  type State = { prop: string };
  const initialState: State = { prop: `` };
  const store = createStore(``, initialState, {
    $$init: (state) => state,
    $$reset: (state) => state,
    reducer: (state) => state,
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
      $$init: (state) => state,
      $$reset: (state) => state,
    },
  );
}

{
  type State = { prop: string };
  const initialState: State = { prop: `` };
  createStore(``, initialState, {
    $$init: (state) => state,
    // @ts-expect-error
    $$initialized: (state) => state,
    $$reset: (state) => state,
  });
}

{
  type State = { prop: string };
  const initialState: State = { prop: `` };
  createStore(``, initialState, {
    $$init: (state) => {
      ((_initialized: boolean) => null)(state.$$initialized);
      return state;
    },
    $$reset: (state) => {
      ((_initialized: boolean) => null)(state.$$initialized);
      return state;
    },
    reducer: (state) => {
      ((_initialized: boolean) => null)(state.$$initialized);
      // @ts-expect-error
      ((_initialized: string) => null)(state.$$initialized);
      return state;
    },
  });
}
