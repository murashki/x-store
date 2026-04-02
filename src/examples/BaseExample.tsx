import { useEffect } from 'react';
import React from 'react';

import { createStore } from '../lib/src';
import { useDispatcher } from '../lib/src';
import { useState } from '../lib/src';
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
  productName: `Новый продукт`,
};

const formStore = createStore(`form`, initialFormState, {
  [`$$init`]: (): FormState => {
    return initialFormState;
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
  console.log(`App render`);

  useStore(appStore, (init) => {
    return init();
  });

  useStore(formStore, (init) => {
    return init();
  });

  const formOpen = useState(appStore.formOpen);
  const productName = useState(formStore.productName);
  const dispatchFormToggle = useDispatcher(appStore.formToggle);

  useEffect(() => {
    console.log(`App effect`);
    return () => console.log(`App cleanup effect`);
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
  console.log(`Form render`);

  const productName = useState(formStore.productName);
  const dispatchProductNameChange = useDispatcher(formStore.productNameChange);
  const dispatchProductNameClear = useDispatcher(formStore.productNameClear);

  useEffect(() => {
    console.log(`Form effect`);
    return () => console.log(`Form cleanup effect`);
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
