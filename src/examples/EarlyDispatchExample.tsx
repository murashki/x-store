import { useEffect } from 'react';
import React from 'react';

import { createStore } from '../lib/src';
import { StoreProvider } from '../lib/src';
import { useDispatcher } from '../lib/src';
import { useProp } from '../lib/src';

type ProductState = {
  productName: string;
  requestStatus: `done` | `idle` | `loading`;
};

const initialProductState: ProductState = {
  productName: ``,
  requestStatus: `idle`,
};

const productStore = createStore(`product`, initialProductState, {
  $$init: (state): ProductState => {
    return state;
  },
  $$reset: (state): ProductState => {
    return state;
  },
  requestDone: (state, payload: RequestDonePayload): ProductState => {
    return {
      ...state,
      productName: payload.productName,
      requestStatus: `done`,
    };
  },
  requestStart: (state): ProductState => {
    return {
      ...state,
      requestStatus: `loading`,
    };
  },
});

type RequestDonePayload = {
  productName: string;
};

export const App = React.memo(function App() {
  console.log(`App render`);

  useEffect(() => {
    console.log(`App effect`);
  });

  return (
    <StoreProvider
      instanceKey={`1`}
      prefill={{ productName: `Продукт из prefill` }}
      store={productStore}
    >
      <Product />
    </StoreProvider>
  );
});

const Product = React.memo(function Product() {
  const initialized = useProp(productStore.$$initialized);
  const instanceKey = useProp(productStore.$$instanceKey);
  const productName = useProp(productStore.productName);
  const requestStatus = useProp(productStore.requestStatus);
  const dispatchRequestDone = useDispatcher(productStore.requestDone);
  const dispatchRequestStart = useDispatcher(productStore.requestStart);

  console.log(`Product render`, { initialized, instanceKey, productName, requestStatus });

  useEffect(() => {
    console.log(`Product effect: dispatch requestStart before the StoreProvider effect creates the instance`);
    dispatchRequestStart();
    const timeoutId = setTimeout(() => {
      dispatchRequestDone({ productName: `Продукт из запроса` });
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [dispatchRequestDone, dispatchRequestStart]);

  return (
    <div>
      <div>initialized: {String(initialized)}</div>
      <div>instanceKey: {String(instanceKey)}</div>
      <div>requestStatus: {requestStatus}</div>
      <div>productName: {productName}</div>
    </div>
  );
});
