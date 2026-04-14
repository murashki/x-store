import { createStore } from '../src/index.tsx';
import { createStoreRegistry } from '../src/index.tsx';

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
  useProp(store.prop, 0);
  useProp(store.prop, ``);
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
