import { useEffect } from 'react';
import { useRef } from 'react';
import React from 'react';

import type { InstanceKey } from '../lib/src';
import { createStore } from '../lib/src';
import { useDispatcher } from '../lib/src';
import { useProp } from '../lib/src';
import { usePropSelectorAll } from '../lib/src';
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

const instanceKeys: InstanceKey[] = [`a`, `b`, `c`];

function isPositive(state: CounterState): boolean {
  return state.count > 0;
}

export const App = React.memo(function App() {
  console.log(`App render`);

  useEffect(() => {
    console.log(`App effect`);
  });

  useStore(counterStore, instanceKeys, (init) => {
    return init();
  });

  return (
    <div>
      {instanceKeys.map((instanceKey) => (
        <Counter
          key={String(instanceKey)}
          instanceKey={instanceKey}
        />
      ))}
      <SummaryLogger />
    </div>
  );
});

type CounterProps = {
  instanceKey: InstanceKey;
};

const Counter = React.memo(function Counter(props: CounterProps) {
  const count = useProp(counterStore.count, props.instanceKey);
  const dispatchIncrement = useDispatcher(counterStore.increment);

  console.log(`Counter render`, { count, instanceKey: props.instanceKey });

  return (
    <div>
      <span>{String(props.instanceKey)}: {count}</span>
      {` `}
      <button
        onClick={() => dispatchIncrement(props.instanceKey)}
      >
        Increment
      </button>
    </div>
  );
});

const SummaryLogger = React.memo(function SummaryLogger() {
  const selectCountAll = usePropSelectorAll(counterStore.count);
  const selectPositiveCountAll = usePropSelectorAll(counterStore.count, isPositive);
  const renderCountRef = useRef(0);

  renderCountRef.current += 1;

  console.log(`SummaryLogger render`, { renders: renderCountRef.current });

  useEffect(() => {
    console.log(`SummaryLogger effect: selectors are stable, so this effect runs once`);
  }, [selectCountAll, selectPositiveCountAll]);

  return (
    <div>
      <div>SummaryLogger renders: {renderCountRef.current}</div>
      <button
        onClick={() => {
          const countAll = selectCountAll();
          const total = countAll.reduce((sum, [, count]) => sum + count, 0);
          console.log(`SummaryLogger click`, { countAll, positiveCountAll: selectPositiveCountAll(), total });
        }}
      >
        Log all counts
      </button>
    </div>
  );
});
