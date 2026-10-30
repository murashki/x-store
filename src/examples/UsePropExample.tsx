import { useEffect } from 'react';
import { useRef } from 'react';
import React from 'react';

import { createStore } from '../lib/src';
import { useDispatcher } from '../lib/src';
import { useProp } from '../lib/src';
import { useStore } from '../lib/src';

type CounterState = {
  count: number;
};

const initialCounterState: CounterState = {
  count: 0,
};

const counterStore = createStore(`counter`, initialCounterState, {
  $$init: (state): CounterState => {
    return state;
  },
  $$reset: (state): CounterState => {
    return state;
  },
  increment: (state): CounterState => {
    return {
      ...state,
      count: state.count + 1,
    };
  },
});

export const App = React.memo(function App() {
  console.log(`App render`);

  useEffect(() => {
    console.log(`App effect`);
  });

  useStore(counterStore, (init) => {
    return init();
  });

  return (
    <div>
      <CounterDisplay />
      <CounterButton />
      <Sibling />
    </div>
  );
});

const CounterDisplay = React.memo(function CounterDisplay() {
  const count = useProp(counterStore.count);
  const renderCountRef = useRef(0);

  renderCountRef.current += 1;

  console.log(`CounterDisplay render`, { count, renders: renderCountRef.current });

  return (
    <div>
      <div>count: {count}</div>
      <div>CounterDisplay renders: {renderCountRef.current}</div>
    </div>
  );
});

const CounterButton = React.memo(function CounterButton() {
  const dispatchIncrement = useDispatcher(counterStore.increment);
  const renderCountRef = useRef(0);

  renderCountRef.current += 1;

  console.log(`CounterButton render`, { renders: renderCountRef.current });

  return (
    <div>
      <button
        onClick={() => dispatchIncrement()}
      >
        Increment
      </button>
      <div>CounterButton renders: {renderCountRef.current}</div>
    </div>
  );
});

const Sibling = React.memo(function Sibling() {
  const renderCountRef = useRef(0);

  renderCountRef.current += 1;

  console.log(`Sibling render`, { renders: renderCountRef.current });

  return (
    <div>Sibling renders: {renderCountRef.current}</div>
  );
});
