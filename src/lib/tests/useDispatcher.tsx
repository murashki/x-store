import { createStore } from '../src/index.tsx';
import { createStoreRegistry } from '../src/index.tsx';

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
    [`$$init`]: (state) => state,
    [`$$reset`]: (state) => state,
    reducer: (state): State => ({ ...state }),
  });
  useDispatcher(store.reducer);
}

{
  const { useDispatcher } = createStoreRegistry();
  type State = { propA: string, propB: number };
  const initialState: State = { propA: ``, propB: 0 };
  const store = createStore(``, initialState, {
    [`$$init`]: (state) => state,
    [`$$reset`]: (state) => state,
    reducer: (state, payload: { prop: string }): State => ({ ...state, propA: payload.prop }),
  });
  useDispatcher(store.reducer);
}

{
  const { useDispatcher } = createStoreRegistry();
  type State = { propA: string, propB: number };
  const initialState: State = { propA: ``, propB: 0 };
  const store = createStore(``, initialState, {
    [`$$init`]: (state) => state,
    [`$$reset`]: (state) => state,
    reducer: (state): State => ({ ...state }),
  });
  // @ts-expect-error
  useDispatcher(store.prop);
}

{
  const { useDispatcher } = createStoreRegistry();
  type State = { propA: string, propB: number };
  const initialState: State = { propA: ``, propB: 0 };
  const store = createStore(``, initialState, {
    [`$$init`]: (state) => state,
    [`$$reset`]: (state) => state,
    reducer: (state): State => ({ ...state }),
  });
  const dispatchAction = useDispatcher(store.reducer);
  dispatchAction();
}

{
  const { useDispatcher } = createStoreRegistry();
  type State = { propA: string, propB: number };
  const initialState: State = { propA: ``, propB: 0 };
  const store = createStore(``, initialState, {
    [`$$init`]: (state) => state,
    [`$$reset`]: (state) => state,
    reducer: (state): State => ({ ...state }),
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
    [`$$init`]: (state) => state,
    [`$$reset`]: (state) => state,
    reducer: (state, payload: { prop: string }): State => ({ ...state, propA: payload.prop }),
  });
  const dispatchAction = useDispatcher(store.reducer);
  dispatchAction({ prop: `` });
}

{
  const { useDispatcher } = createStoreRegistry();
  type State = { propA: string, propB: number };
  const initialState: State = { propA: ``, propB: 0 };
  const store = createStore(``, initialState, {
    [`$$init`]: (state) => state,
    [`$$reset`]: (state) => state,
    reducer: (state, payload: { prop: string }): State => ({ ...state, propA: payload.prop }),
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
    [`$$init`]: (state) => state,
    [`$$reset`]: (state) => state,
    reducer: (state, payload: { prop: string }): State => ({ ...state, propA: payload.prop }),
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
    [`$$init`]: (state) => state,
    [`$$reset`]: (state) => state,
    reducer: (state): State => ({ ...state }),
  });
  const dispatchAction = useDispatcher(store.reducer);
  dispatchAction(0);
}

{
  const { useDispatcher } = createStoreRegistry();
  type State = { propA: string, propB: number };
  const initialState: State = { propA: ``, propB: 0 };
  const store = createStore(``, initialState, {
    [`$$init`]: (state) => state,
    [`$$reset`]: (state) => state,
    reducer: (state): State => ({ ...state }),
  });
  const dispatchAction = useDispatcher(store.reducer);
  dispatchAction(``);
}

{
  const { useDispatcher } = createStoreRegistry();
  type State = { propA: string, propB: number };
  const initialState: State = { propA: ``, propB: 0 };
  const store = createStore(``, initialState, {
    [`$$init`]: (state) => state,
    [`$$reset`]: (state) => state,
    reducer: (state): State => ({ ...state }),
  });
  const dispatchAction = useDispatcher(store.reducer);
  dispatchAction(Symbol());
}

{
  const { useDispatcher } = createStoreRegistry();
  type State = { propA: string, propB: number };
  const initialState: State = { propA: ``, propB: 0 };
  const store = createStore(``, initialState, {
    [`$$init`]: (state) => state,
    [`$$reset`]: (state) => state,
    reducer: (state, payload: { prop: string }): State => ({ ...state, propA: payload.prop }),
  });
  const dispatchAction = useDispatcher(store.reducer);
  dispatchAction(0, { prop: `` });
}

{
  const { useDispatcher } = createStoreRegistry();
  type State = { propA: string, propB: number };
  const initialState: State = { propA: ``, propB: 0 };
  const store = createStore(``, initialState, {
    [`$$init`]: (state) => state,
    [`$$reset`]: (state) => state,
    reducer: (state, payload: { prop: string }): State => ({ ...state, propA: payload.prop }),
  });
  const dispatchAction = useDispatcher(store.reducer);
  dispatchAction(``, { prop: `` });
}

{
  const { useDispatcher } = createStoreRegistry();
  type State = { propA: string, propB: number };
  const initialState: State = { propA: ``, propB: 0 };
  const store = createStore(``, initialState, {
    [`$$init`]: (state) => state,
    [`$$reset`]: (state) => state,
    reducer: (state, payload: { prop: string }): State => ({ ...state, propA: payload.prop }),
  });
  const dispatchAction = useDispatcher(store.reducer);
  dispatchAction(Symbol(), { prop: `` });
}
