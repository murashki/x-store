import { createStore } from '../../src';
import { createStoreRegistry } from '../../src';

{
  const { useProp } = createStoreRegistry();
  type State = { prop: string };
  const initialState: State = { prop: `` };
  const store = createStore(``, initialState, {
    [`$$init`]: (state) => state,
    [`$$reset`]: (state) => state,
    reducer: (state): State => ({ ...state }),
  });
  // @ts-expect-error
  useProp();
  // @ts-expect-error
  useProp(null);
  useProp(store.prop);
  // @ts-expect-error
  useProp(store.reducer);
}

{
  const { useProp } = createStoreRegistry();
  type State = { prop: string };
  const initialState: State = { prop: `` };
  const store = createStore(``, initialState, {
    [`$$init`]: (state) => state,
    [`$$reset`]: (state) => state,
    reducer: (state): State => ({ ...state }),
  });
  useProp(store.prop, `0`);
  useProp(store.prop, Symbol());
  // @ts-expect-error
  useProp(store.prop, null);
}

{
  const { useProp } = createStoreRegistry();
  type State = { prop: string };
  const initialState: State = { prop: `` };
  const store = createStore(``, initialState, {
    [`$$init`]: (state) => state,
    [`$$reset`]: (state) => state,
    reducer: (state): State => ({ ...state }),
  });
  const prop = useProp(store.prop);
  ((_prop: string) => null)(prop);
  // @ts-expect-error
  ((_prop: number) => null)(prop);
}

{
  const { useProp } = createStoreRegistry();
  type State = { prop: string };
  const initialState: State = { prop: `` };
  const store = createStore(``, initialState, {
    [`$$init`]: (state) => state,
    [`$$reset`]: (state) => state,
    reducer: (state): State => ({ ...state }),
  });
  useProp(store[`$$initialized`]);
  useProp(store[`$$initialized`], `0`);
  useProp(store[`$$initialized`], Symbol());
  // @ts-expect-error
  useProp(store[`$$initialized`], null);
}

{
  const { useProp } = createStoreRegistry();
  type State = { prop: string };
  const initialState: State = { prop: `` };
  const store = createStore(``, initialState, {
    [`$$init`]: (state) => state,
    [`$$reset`]: (state) => state,
    reducer: (state): State => ({ ...state }),
  });
  const initialized = useProp(store[`$$initialized`]);
  ((_initialized: boolean) => null)(initialized);
  // @ts-expect-error
  ((_initialized: string) => null)(initialized);
}
