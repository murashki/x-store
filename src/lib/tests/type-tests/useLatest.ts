import { createStore } from '../../src';
import { createStoreRegistry } from '../../src';

{
  const { useLatest } = createStoreRegistry();
  type State = { prop: string };
  const initialState: State = { prop: `` };
  const store = createStore(``, initialState, {
    $$init: (state) => state,
    $$reset: (state) => state,
    reducerA: (state): State => ({ ...state }),
    reducerB: (state): State => ({ ...state }),
  });
  useLatest((actionName) => {
    ((_actionName: `reducerA`) => null)(actionName);
  }, [store.reducerA]);
  useLatest((actionName) => {
    // @ts-expect-error
    ((_actionName: `reducerB`) => null)(actionName);
  }, [store.reducerA]);
  useLatest((actionName) => {
    ((_actionName: `reducerA` | `reducerB`) => null)(actionName);
  }, [store.reducerA]);
  useLatest((actionName) => {
    // @ts-expect-error
    ((_actionName: `reducerA`) => null)(actionName);
  }, [store.reducerA, store.reducerB]);
  useLatest((actionName) => {
    // @ts-expect-error
    ((_actionName: `reducerB`) => null)(actionName);
  }, [store.reducerA, store.reducerB]);
  useLatest((actionName) => {
    ((_actionName: `reducerA` | `reducerB`) => null)(actionName);
  }, [store.reducerA, store.reducerB]);
}
