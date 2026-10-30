import type { InstanceKey } from '../../src';
import { createStore } from '../../src';
import { createStoreRegistry } from '../../src';

{
  const { usePropSelector } = createStoreRegistry();
  type State = { prop: string };
  const initialState: State = { prop: `` };
  const store = createStore(``, initialState, {
    $$init: (state) => state,
    $$reset: (state) => state,
    reducer: (state): State => ({ ...state }),
  });
  // @ts-expect-error
  usePropSelector();
  // @ts-expect-error
  usePropSelector(null);
  usePropSelector(store.prop);
  // @ts-expect-error
  usePropSelector(store.reducer);
}

{
  const { usePropSelector } = createStoreRegistry();
  type State = { prop: string };
  const initialState: State = { prop: `` };
  const store = createStore(``, initialState, {
    $$init: (state) => state,
    $$reset: (state) => state,
    reducer: (state): State => ({ ...state }),
  });
  usePropSelector(store.prop, `0`);
  usePropSelector(store.prop, Symbol());
  // @ts-expect-error
  usePropSelector(store.prop, null);
}

{
  const { usePropSelector } = createStoreRegistry();
  type State = { prop: string };
  const initialState: State = { prop: `` };
  const store = createStore(``, initialState, {
    $$init: (state) => state,
    $$reset: (state) => state,
    reducer: (state): State => ({ ...state }),
  });
  const selectProp = usePropSelector(store.prop);
  ((_selectProp: () => string) => null)(selectProp);
  // @ts-expect-error
  ((_selectProp: () => number) => null)(selectProp);
  // @ts-expect-error
  ((_prop: string) => null)(selectProp);
  const prop = selectProp();
  ((_prop: string) => null)(prop);
  // @ts-expect-error
  ((_prop: number) => null)(prop);
}

{
  const { usePropSelector } = createStoreRegistry();
  type State = { prop: string };
  const initialState: State = { prop: `` };
  const store = createStore(``, initialState, {
    $$init: (state) => state,
    $$reset: (state) => state,
    reducer: (state): State => ({ ...state }),
  });
  usePropSelector(store.$$initialized);
  usePropSelector(store.$$initialized, `0`);
  usePropSelector(store.$$initialized, Symbol());
  // @ts-expect-error
  usePropSelector(store.$$initialized, null);
  const selectInitialized = usePropSelector(store.$$initialized);
  ((_selectInitialized: () => boolean) => null)(selectInitialized);
  // @ts-expect-error
  ((_selectInitialized: () => string) => null)(selectInitialized);
}

{
  const { usePropSelector } = createStoreRegistry();
  type State = { prop: string };
  const initialState: State = { prop: `` };
  const store = createStore(``, initialState, {
    $$init: (state) => state,
    $$reset: (state) => state,
    reducer: (state): State => ({ ...state }),
  });
  usePropSelector(store.$$instanceKey);
  usePropSelector(store.$$instanceKey, `0`);
  usePropSelector(store.$$instanceKey, Symbol());
  // @ts-expect-error
  usePropSelector(store.$$instanceKey, null);
  const selectInstanceKey = usePropSelector(store.$$instanceKey);
  ((_selectInstanceKey: () => InstanceKey) => null)(selectInstanceKey);
  // @ts-expect-error
  ((_selectInstanceKey: () => number) => null)(selectInstanceKey);
}
