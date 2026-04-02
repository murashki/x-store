import { createStore } from '../src/index.tsx';
import { createStoreRegistry } from '../src/index.tsx';

{
  const { useStore } = createStoreRegistry();
  // @ts-expect-error
  useStore();
}

{
  const { useStore } = createStoreRegistry();
  // @ts-expect-error
  useStore(null);
}

{
  const { useStore } = createStoreRegistry();
  type State = { propA: string, propB: number };
  const initialState: State = { propA: ``, propB: 0 };
  const store = createStore(``, initialState, {
    [`$$init`]: (state) => state,
    [`$$reset`]: (state) => state,
  });
  // @ts-expect-error
  useStore(store);
  // @ts-expect-error
  useStore(store, () => {});
  // @ts-expect-error
  useStore(store, () => {
    return;
  });
}

{
  const { useStore } = createStoreRegistry();
  type State = { propA: string, propB: number };
  const initialState: State = { propA: ``, propB: 0 };
  const store = createStore(``, initialState, {
    [`$$init`]: (state) => state,
    [`$$reset`]: (state) => state,
  });
  useStore(store, (init) => {
    return init();
  });
  useStore(store, (init) => {
    const reset = init();
    return () => reset();
  });
}

{
  const { useStore } = createStoreRegistry();
  type State = { propA: string, propB: number };
  const initialState: State = { propA: ``, propB: 0 };
  const store = createStore(``, initialState, {
    [`$$init`]: (state, payload: { prop: string }) => ({ ...state, propA: payload.prop }),
    [`$$reset`]: (state) => state,
  });
  useStore(store, (init) => {
    // @ts-expect-error
    return init();
  });
  useStore(store, (init) => {
    // @ts-expect-error
    const reset = init();
    return () => reset();
  });
}

{
  const { useStore } = createStoreRegistry();
  type State = { propA: string, propB: number };
  const initialState: State = { propA: ``, propB: 0 };
  const store = createStore(``, initialState, {
    [`$$init`]: (state, payload: { prop: string }) => ({ ...state, propA: payload.prop }),
    [`$$reset`]: (state) => state,
  });
  useStore(store, (init) => {
    return init({ prop: `` });
  });
  useStore(store, (init) => {
    const reset = init({ prop: `` });
    return () => reset();
  });
}

{
  const { useStore } = createStoreRegistry();
  type State = { propA: string, propB: number };
  const initialState: State = { propA: ``, propB: 0 };
  const store = createStore(``, initialState, {
    [`$$init`]: (state) => state,
    [`$$reset`]: (state, payload: { prop: string }) => ({ ...state, propA: payload.prop }),
  });
  // @ts-expect-error
  useStore(store, (init) => {
    return init();
  });
  useStore(store, (init) => {
    const reset = init();
    // @ts-expect-error
    return () => reset();
  });
}

{
  const { useStore } = createStoreRegistry();
  type State = { propA: string, propB: number };
  const initialState: State = { propA: ``, propB: 0 };
  const store = createStore(``, initialState, {
    [`$$init`]: (state) => state,
    [`$$reset`]: (state, payload: { prop: string }) => ({ ...state, propA: payload.prop }),
  });
  useStore(store, (init) => {
    const reset = init();
    return () => reset({ prop: `` });
  });
}

{
  const { useStore } = createStoreRegistry();
  type State = { propA: string, propB: number };
  const initialState: State = { propA: ``, propB: 0 };
  const store = createStore(``, initialState, {
    [`$$init`]: (state) => state,
    [`$$reset`]: (state) => state,
  });
  useStore(store, [], (init) => {
    return init();
  });
  useStore(store, [0], (init) => {
    return init();
  });
  useStore(store, [`0`], (init) => {
    return init();
  });
  useStore(store, [Symbol()], (init) => {
    return init();
  });
}
