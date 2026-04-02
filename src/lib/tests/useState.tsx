import { createStore } from '../src/index.tsx';
import { createStoreRegistry } from '../src/index.tsx';

{
  const { useState } = createStoreRegistry();
  // @ts-expect-error
  useState();
}

{
  const { useState } = createStoreRegistry();
  // @ts-expect-error
  useState(null);
}

{
  const { useState } = createStoreRegistry();
  type State = { prop: string };
  const initialState: State = { prop: `` };
  const store = createStore(``, initialState, {
    [`$$init`]: (state) => state,
    [`$$reset`]: (state) => state,
    reducer: (state): State => ({ ...state }),
  });
  useState(store.prop);
}

{
  const { useState } = createStoreRegistry();
  type State = { prop: string };
  const initialState: State = { prop: `` };
  const store = createStore(``, initialState, {
    [`$$init`]: (state) => state,
    [`$$reset`]: (state) => state,
    reducer: (state): State => ({ ...state }),
  });
  // @ts-expect-error
  useState(store.reducer);
}

{
  const { useState } = createStoreRegistry();
  type State = { prop: string };
  const initialState: State = { prop: `` };
  const store = createStore(``, initialState, {
    [`$$init`]: (state) => state,
    [`$$reset`]: (state) => state,
    reducer: (state): State => ({ ...state }),
  });
  useState(store.prop, 0);
}

{
  const { useState } = createStoreRegistry();
  type State = { prop: string };
  const initialState: State = { prop: `` };
  const store = createStore(``, initialState, {
    [`$$init`]: (state) => state,
    [`$$reset`]: (state) => state,
    reducer: (state): State => ({ ...state }),
  });
  useState(store.prop, ``);
}

{
  const { useState } = createStoreRegistry();
  type State = { prop: string };
  const initialState: State = { prop: `` };
  const store = createStore(``, initialState, {
    [`$$init`]: (state) => state,
    [`$$reset`]: (state) => state,
    reducer: (state): State => ({ ...state }),
  });
  useState(store.prop, Symbol());
}

{
  const { useState } = createStoreRegistry();
  type State = { prop: string };
  const initialState: State = { prop: `` };
  const store = createStore(``, initialState, {
    [`$$init`]: (state) => state,
    [`$$reset`]: (state) => state,
    reducer: (state): State => ({ ...state }),
  });
  // @ts-expect-error
  useState(store.prop, null);
}

{
  const { useState } = createStoreRegistry();
  type State = { prop: string };
  const initialState: State = { prop: `` };
  const store = createStore(``, initialState, {
    [`$$init`]: (state) => state,
    [`$$reset`]: (state) => state,
    reducer: (state): State => ({ ...state }),
  });
  const prop = useState(store.prop);
  ((_prop: string) => null)(prop)
}

{
  const { useState } = createStoreRegistry();
  type State = { prop: string };
  const initialState: State = { prop: `` };
  const store = createStore(``, initialState, {
    [`$$init`]: (state) => state,
    [`$$reset`]: (state) => state,
    reducer: (state): State => ({ ...state }),
  });
  const prop = useState(store.prop);
  // @ts-expect-error
  ((_prop: number) => null)(prop)
}
