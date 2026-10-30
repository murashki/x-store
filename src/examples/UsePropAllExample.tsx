import { useEffect } from 'react';
import { useRef } from 'react';
import React from 'react';

import type { InstanceKey } from '../lib/src';
import { createStore } from '../lib/src';
import { useDispatcher } from '../lib/src';
import { useProp } from '../lib/src';
import { usePropAll } from '../lib/src';
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

const pickedInstanceKeys: InstanceKey[] = [`a`, `c`];

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
      <Summary />
      <PickedSummary />
      <PositiveSummary />
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

const Summary = React.memo(function Summary() {
  const countAll = usePropAll(counterStore.count);
  const renderCountRef = useRef(0);

  renderCountRef.current += 1;

  const total = countAll.reduce((sum, [, count]) => sum + count, 0);

  console.log(`Summary render`, { countAll, renders: renderCountRef.current });

  return (
    <div>
      <div>All instances: {countAll.map(([instanceKey, count]) => `${String(instanceKey)}=${count}`).join(`, `)}</div>
      <div>Total: {total}</div>
      <div>Summary renders: {renderCountRef.current}</div>
    </div>
  );
});

const PickedSummary = React.memo(function PickedSummary() {
  const countAll = usePropAll(counterStore.count, pickedInstanceKeys);
  const renderCountRef = useRef(0);

  renderCountRef.current += 1;

  console.log(`PickedSummary render`, { countAll, renders: renderCountRef.current });

  return (
    <div>
      <div>Picked instances (a, c): {countAll.map(([instanceKey, count]) => `${String(instanceKey)}=${count}`).join(`, `)}</div>
      <div>PickedSummary renders: {renderCountRef.current}</div>
    </div>
  );
});

const PositiveSummary = React.memo(function PositiveSummary() {
  const countAll = usePropAll(counterStore.count, isPositive);
  const renderCountRef = useRef(0);

  renderCountRef.current += 1;

  console.log(`PositiveSummary render`, { countAll, renders: renderCountRef.current });

  return (
    <div>
      <div>Positive instances: {countAll.map(([instanceKey, count]) => `${String(instanceKey)}=${count}`).join(`, `)}</div>
      <div>PositiveSummary renders: {renderCountRef.current}</div>
    </div>
  );
});
