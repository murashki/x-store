import type { Patch } from '../../src';
import { createStore } from '../../src';
import { createStoreRegistry } from '../../src';

{
  const { useDispatcher } = createStoreRegistry();
  // @ts-expect-error
  useDispatcher();
}

{
  const { useDispatcher } = createStoreRegistry();
  // @ts-expect-error
  useDispatcher(null);
}

{
  const { useDispatcher } = createStoreRegistry();
  type State = { propA: string, propB: number };
  const initialState: State = { propA: ``, propB: 0 };
  const store = createStore(``, initialState, {
    $$init: () => ({}),
    $$reset: () => ({}),
    reducer: (): Patch<State> => ({}),
  });
  useDispatcher(store.reducer);
}

{
  const { useDispatcher } = createStoreRegistry();
  type State = { propA: string, propB: number };
  const initialState: State = { propA: ``, propB: 0 };
  const store = createStore(``, initialState, {
    $$init: () => ({}),
    $$reset: () => ({}),
    reducer: (state, payload: { prop: string }): Patch<State> => ({ propA: payload.prop }),
  });
  useDispatcher(store.reducer);
}

{
  const { useDispatcher } = createStoreRegistry();
  type State = { propA: string, propB: number };
  const initialState: State = { propA: ``, propB: 0 };
  const store = createStore(``, initialState, {
    $$init: () => ({}),
    $$reset: () => ({}),
    reducer: (): Patch<State> => ({}),
  });
  // @ts-expect-error
  useDispatcher(store.prop);
}

{
  const { useDispatcher } = createStoreRegistry();
  type State = { propA: string, propB: number };
  const initialState: State = { propA: ``, propB: 0 };
  const store = createStore(``, initialState, {
    $$init: () => ({}),
    $$reset: () => ({}),
    reducer: (): Patch<State> => ({}),
  });
  const dispatchAction = useDispatcher(store.reducer);
  dispatchAction();
}

{
  const { useDispatcher } = createStoreRegistry();
  type State = { propA: string, propB: number };
  const initialState: State = { propA: ``, propB: 0 };
  const store = createStore(``, initialState, {
    $$init: () => ({}),
    $$reset: () => ({}),
    reducer: (): Patch<State> => ({}),
  });
  const dispatchAction = useDispatcher(store.reducer);
  // @ts-expect-error
  dispatchAction({ propA: ``, propB: 0 });
}

{
  const { useDispatcher } = createStoreRegistry();
  type State = { propA: string, propB: number };
  const initialState: State = { propA: ``, propB: 0 };
  const store = createStore(``, initialState, {
    $$init: () => ({}),
    $$reset: () => ({}),
    reducer: (state, payload: { prop: string }): Patch<State> => ({ propA: payload.prop }),
  });
  const dispatchAction = useDispatcher(store.reducer);
  dispatchAction({ prop: `` });
}

{
  const { useDispatcher } = createStoreRegistry();
  type State = { propA: string, propB: number };
  const initialState: State = { propA: ``, propB: 0 };
  const store = createStore(``, initialState, {
    $$init: () => ({}),
    $$reset: () => ({}),
    reducer: (state, payload: { prop: string }): Patch<State> => ({ propA: payload.prop }),
  });
  const dispatchAction = useDispatcher(store.reducer);
  // @ts-expect-error
  dispatchAction();
}

{
  const { useDispatcher } = createStoreRegistry();
  type State = { propA: string, propB: number };
  const initialState: State = { propA: ``, propB: 0 };
  const store = createStore(``, initialState, {
    $$init: () => ({}),
    $$reset: () => ({}),
    reducer: (state, payload: { prop: string }): Patch<State> => ({ propA: payload.prop }),
  });
  const dispatchAction = useDispatcher(store.reducer);
  // @ts-expect-error
  dispatchAction({ propA: ``, propB: 0 });
}

{
  const { useDispatcher } = createStoreRegistry();
  type State = { propA: string, propB: number };
  const initialState: State = { propA: ``, propB: 0 };
  const store = createStore(``, initialState, {
    $$init: () => ({}),
    $$reset: () => ({}),
    reducer: (): Patch<State> => ({}),
  });
  const dispatchAction = useDispatcher(store.reducer);
  dispatchAction(`0`);
}

{
  const { useDispatcher } = createStoreRegistry();
  type State = { propA: string, propB: number };
  const initialState: State = { propA: ``, propB: 0 };
  const store = createStore(``, initialState, {
    $$init: () => ({}),
    $$reset: () => ({}),
    reducer: (): Patch<State> => ({}),
  });
  const dispatchAction = useDispatcher(store.reducer);
  dispatchAction(``);
}

{
  const { useDispatcher } = createStoreRegistry();
  type State = { propA: string, propB: number };
  const initialState: State = { propA: ``, propB: 0 };
  const store = createStore(``, initialState, {
    $$init: () => ({}),
    $$reset: () => ({}),
    reducer: (): Patch<State> => ({}),
  });
  const dispatchAction = useDispatcher(store.reducer);
  dispatchAction(Symbol());
}

{
  const { useDispatcher } = createStoreRegistry();
  type State = { propA: string, propB: number };
  const initialState: State = { propA: ``, propB: 0 };
  const store = createStore(``, initialState, {
    $$init: () => ({}),
    $$reset: () => ({}),
    reducer: (state, payload: { prop: string }): Patch<State> => ({ propA: payload.prop }),
  });
  const dispatchAction = useDispatcher(store.reducer);
  dispatchAction(`0`, { prop: `` });
}

{
  const { useDispatcher } = createStoreRegistry();
  type State = { propA: string, propB: number };
  const initialState: State = { propA: ``, propB: 0 };
  const store = createStore(``, initialState, {
    $$init: () => ({}),
    $$reset: () => ({}),
    reducer: (state, payload: { prop: string }): Patch<State> => ({ propA: payload.prop }),
  });
  const dispatchAction = useDispatcher(store.reducer);
  dispatchAction(``, { prop: `` });
}

{
  const { useDispatcher } = createStoreRegistry();
  type State = { propA: string, propB: number };
  const initialState: State = { propA: ``, propB: 0 };
  const store = createStore(``, initialState, {
    $$init: () => ({}),
    $$reset: () => ({}),
    reducer: (state, payload: { prop: string }): Patch<State> => ({ propA: payload.prop }),
  });
  const dispatchAction = useDispatcher(store.reducer);
  dispatchAction(Symbol(), { prop: `` });
}
