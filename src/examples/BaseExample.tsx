import { useEffect } from 'react';
import React from 'react';

import type { Patch } from '../lib/src';
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
  $$init: (): Patch<AppState> => {
    return {};
  },
  $$reset: (): Patch<AppState> => {
    return {};
  },
  formToggle: (state): Patch<AppState> => {
    return {
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
  $$init: (): Patch<FormState> => {
    return {
      productName: `Новый продукт`,
    };
  },
  $$reset: (): Patch<FormState> => {
    return {};
  },
  productNameChange: (state, payload: ProductNameChangePayload): Patch<FormState> => {
    return {
      productName: payload.productName,
    };
  },
  productNameClear: (): Patch<FormState> => {
    return {
      productName: ``,
    };
  },
});

type ProductNameChangePayload = {
  productName: string;
};

export const App = React.memo(function App() {
  const appStoreInitialized = useProp(appStore.$$initialized);
  const formOpen = useProp(appStore.formOpen);
  const formStoreInitialized = useProp(formStore.$$initialized);
  const productName = useProp(formStore.productName);
  const dispatchFormToggle = useDispatcher(appStore.formToggle);

  console.log(`App render`, { formOpen, productName });

  console.log(`appStoreInitialized`, appStoreInitialized);
  console.log(`formStoreInitialized`, formStoreInitialized);

  useEffect(() => {
    console.log(`App effect`);
  });

  useStore(appStore, (init) => {
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

const Form = React.memo(function Form() {
  const productName = useProp(formStore.productName);
  const dispatchProductNameChange = useDispatcher(formStore.productNameChange);
  const dispatchProductNameClear = useDispatcher(formStore.productNameClear);

  console.log(`Form render`, { productName });

  useEffect(() => {
    console.log(`Form effect`);
  });

  useStore(formStore, (init) => {
    return init();
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
