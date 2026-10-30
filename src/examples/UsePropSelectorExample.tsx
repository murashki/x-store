import { useEffect } from 'react';
import { useRef } from 'react';
import React from 'react';

import { createStore } from '../lib/src';
import { useDispatcher } from '../lib/src';
import { useProp } from '../lib/src';
import { usePropSelector } from '../lib/src';
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
      <CounterLogger />
    </div>
  );
});

const CounterDisplay = React.memo(function CounterDisplay() {
  const count = useProp(counterStore.count);
  const dispatchIncrement = useDispatcher(counterStore.increment);
  const renderCountRef = useRef(0);

  renderCountRef.current += 1;

  console.log(`CounterDisplay render`, { count, renders: renderCountRef.current });

  return (
    <div>
      <div>count: {count}</div>
      <div>CounterDisplay renders: {renderCountRef.current}</div>
      <button
        onClick={() => dispatchIncrement()}
      >
        Increment
      </button>
    </div>
  );
});

const CounterLogger = React.memo(function CounterLogger() {
  const selectCount = usePropSelector(counterStore.count);
  const selectInitialized = usePropSelector(counterStore.$$initialized);
  const renderCountRef = useRef(0);

  renderCountRef.current += 1;

  console.log(`CounterLogger render`, { renders: renderCountRef.current });

  useEffect(() => {
    console.log(`CounterLogger effect: selectCount is stable, so this effect runs once`);
    const intervalId = setInterval(() => {
      console.log(`CounterLogger interval`, { count: selectCount(), initialized: selectInitialized() });
    }, 2000);
    return () => {
      clearInterval(intervalId);
    };
  }, [selectCount, selectInitialized]);

  return (
    <div>
      <div>CounterLogger renders: {renderCountRef.current}</div>
      <button
        onClick={() => console.log(`CounterLogger click`, { count: selectCount(), initialized: selectInitialized() })}
      >
        Log current count
      </button>
    </div>
  );
});
