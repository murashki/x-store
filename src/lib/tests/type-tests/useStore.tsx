import { createStore } from '../../src';
import { createStoreRegistry } from '../../src';

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
    $$init: () => ({}),
    $$reset: () => ({}),
  });
  // @ts-expect-error
  useStore(store);
  // @ts-expect-error
  useStore(store, () => {});
  // @ts-expect-error
  useStore(store, () => {
    return;
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
    $$init: (state, payload: Partial<State>) => ({ ...payload }),
    $$reset: () => ({}),
  });
  useStore(store, (init) => {
    return init();
  });
  useStore(store, (init) => {
    return init({ propA: `` });
  });
  useStore(store, (init) => {
    const reset = init({ propA: ``, propB: 1 });
    return () => reset();
  });
  useStore(store, (init) => {
    // @ts-expect-error
    return init({ propC: `` });
  });
}

{
  const { useStore } = createStoreRegistry();
  type State = { propA: string, propB: number };
  const initialState: State = { propA: ``, propB: 0 };
  const store = createStore(``, initialState, {
    $$init: () => ({}),
    $$reset: () => ({}),
  });
  useStore(store, (init) => {
    const reset = init();
    return () => reset();
  });
  useStore(store, (init) => {
    const reset = init();
    // @ts-expect-error
    return () => reset({ propA: `` });
  });
}

{
  const { useStore } = createStoreRegistry();
  type State = { propA: string, propB: number };
  const initialState: State = { propA: ``, propB: 0 };
  const store = createStore(``, initialState, {
    $$init: () => ({}),
    $$reset: () => ({}),
  });
  useStore(store, [], (init) => {
    return init();
  });
  useStore(store, [`0`], (init) => {
    return init();
  });
  useStore(store, [Symbol()], (init) => {
    return init();
  });
}
