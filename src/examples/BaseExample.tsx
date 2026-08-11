import { useEffect } from 'react';
import React from 'react';

import { createStore } from '../lib/src';
import { useDispatcher } from '../lib/src';
import { useProp } from '../lib/src';
import { useStore } from '../lib/src';

type AppState = {
  formOpen: boolean;
};

const initialAppState = {
  formOpen: false,
};

const appStore = createStore(`app`, initialAppState, {
  [`$$init`]: (state): AppState => {
    return state;
  },
  [`$$reset`]: (state): AppState => {
    return state;
  },
  formToggle: (state): AppState => {
    return {
      ...state,
      formOpen: ! state.formOpen,
    };
  },
});

type FormState = {
  productName: string;
};

const initialFormState: FormState = {
  productName: ``,
};

const formStore = createStore(`form`, initialFormState, {
  [`$$init`]: (state): FormState => {
    return {
      ...state,
      productName: `Новый продукт`,
    };
  },
  [`$$reset`]: (state): FormState => {
    return {
      ...state,
      productName: `xxx`,
    }
  },
  productNameChange: (state, payload: ProductNameChangePayload): FormState => {
    return {
      ...state,
      productName: payload.productName,
    };
  },
  productNameClear: (state): FormState => {
    return {
      ...state,
      productName: ``,
    };
  },
});

type ProductNameChangePayload = {
  productName: string;
};

export const App = React.memo(function App() {
  const formOpen = useProp(appStore.formOpen);
  const productName = useProp(formStore.productName);
  const dispatchFormToggle = useDispatcher(appStore.formToggle);

  console.log(`App render`, { formOpen, productName });

  useEffect(() => {
    console.log(`App effect`);
  });

  useStore(appStore, (init) => {
    return init();
  });

  useStore(formStore, (init) => {
    return init();
  });

  return (
    <div>
      <div>
        <button
          onClick={() => dispatchFormToggle()}
        >
          {formOpen ? `Close form` : `Open form`}
        </button>
      </div>
      <div>
        {productName}
      </div>
      {formOpen
        ? (
          <Form />
        )
        : null}
    </div>
  );
});

export const Form = React.memo(function Form() {
  const productName = useProp(formStore.productName);
  const dispatchProductNameChange = useDispatcher(formStore.productNameChange);
  const dispatchProductNameClear = useDispatcher(formStore.productNameClear);

  console.log(`Form render`, { productName });

  useEffect(() => {
    console.log(`Form effect`);
  });

  return (
    <div>
      <div>
        <input
          value={productName}
          onChange={(e) => dispatchProductNameChange({ productName: e.target.value })}
        />
      </div>
      <div>
        <button
          onClick={() => dispatchProductNameClear()}
        >
          Clear
        </button>
      </div>
    </div>
  );
});
