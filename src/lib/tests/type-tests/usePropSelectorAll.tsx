import type { InstanceKey } from '../../src';
import { createStore } from '../../src';
import { createStoreRegistry } from '../../src';

{
  const { usePropSelectorAll } = createStoreRegistry();
  type State = { prop: string };
  const initialState: State = { prop: `` };
  const store = createStore(``, initialState, {
    $$init: (state) => state,
    $$reset: (state) => state,
    reducer: (state): State => ({ ...state }),
  });
  // @ts-expect-error
  usePropSelectorAll();
  // @ts-expect-error
  usePropSelectorAll(null);
  usePropSelectorAll(store.prop);
  // @ts-expect-error
  usePropSelectorAll(store.reducer);
}

{
  const { usePropSelectorAll } = createStoreRegistry();
  type State = { prop: string };
  const initialState: State = { prop: `` };
  const store = createStore(``, initialState, {
    $$init: (state) => state,
    $$reset: (state) => state,
    reducer: (state): State => ({ ...state }),
  });
  usePropSelectorAll(store.prop, [`0`, Symbol()]);
  usePropSelectorAll(store.prop, (state) => state.prop === ``);
  // @ts-expect-error
  usePropSelectorAll(store.prop, `0`);
  // @ts-expect-error
  usePropSelectorAll(store.prop, null);
  // @ts-expect-error
  usePropSelectorAll(store.prop, (state) => state.missing === ``);
}

{
  const { usePropSelectorAll } = createStoreRegistry();
  type State = { prop: string };
  const initialState: State = { prop: `` };
  const store = createStore(``, initialState, {
    $$init: (state) => state,
    $$reset: (state) => state,
    reducer: (state): State => ({ ...state }),
  });
  const selectPropAll = usePropSelectorAll(store.prop);
  ((_selectPropAll: () => [InstanceKey, string][]) => null)(selectPropAll);
  // @ts-expect-error
  ((_selectPropAll: () => [InstanceKey, number][]) => null)(selectPropAll);
  const propAll = selectPropAll();
  ((_propAll: [InstanceKey, string][]) => null)(propAll);
  // @ts-expect-error
  ((_propAll: [InstanceKey, number][]) => null)(propAll);
}
