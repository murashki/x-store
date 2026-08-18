import React from 'react';

import { createStore } from '../lib/src';
import { useStore } from '../lib/src';

type AppState = {
  value: number;
};

const initialAppState = {
  value: 0,
};

const appStore = createStore(`app`, initialAppState, {
  $$init: (state): AppState => {
    return state;
  },
  $$reset: (state): AppState => {
    return state;
  },
});

export const App = React.memo(function App() {
  return (
    <div>
      <ComponentA />
      <ComponentB />
    </div>
  );
});

const ComponentA = React.memo(function Form() {
  useStore(appStore, ['1'], (init) => {
    return init();
  });

  return (
    <div>
      ComponentA
    </div>
  );
});

const ComponentB = React.memo(function Form() {
  useStore(appStore, ['1'], (init) => {
    return init();
  });

  return (
    <div>
      ComponentB
    </div>
  );
});
