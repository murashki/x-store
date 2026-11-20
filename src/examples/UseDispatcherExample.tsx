import React from 'react';

import type { InstanceKey } from '../lib/src';
import type { Patch } from '../lib/src';
import { createStore } from '../lib/src';
import { StoreProvider } from '../lib/src';
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
  $$init: (): Patch<CounterState> => {
    return {};
  },
  $$reset: (): Patch<CounterState> => {
    return {};
  },
  add: (state, payload: AddPayload): Patch<CounterState> => {
    return {
      count: state.count + payload.amount,
    };
  },
  increment: (state): Patch<CounterState> => {
    return {
      count: state.count + 1,
    };
  },
});

type AddPayload = {
  amount: number;
};

const instanceKeys: InstanceKey[] = [`a`, `b`];

export const App = React.memo(function App() {
  console.log(`App render`);

  useStore(counterStore, (init) => {
    return init();
  });

  useStore(counterStore, instanceKeys, (init) => {
    return init();
  });

  return (
    <div>
      <DefaultCounter />
      {instanceKeys.map((instanceKey) => (
        <KeyCounter
          key={String(instanceKey)}
          instanceKey={instanceKey}
        />
      ))}
      <StoreProvider
        instanceKey={`c`}
        store={counterStore}
      >
        <ContextCounter />
      </StoreProvider>
      <IncorrectCounter />
    </div>
  );
});

const DefaultCounter = React.memo(function DefaultCounter() {
  const count = useProp(counterStore.count);
  const dispatchAdd = useDispatcher(counterStore.add);
  const dispatchIncrement = useDispatcher(counterStore.increment);

  console.log(`DefaultCounter render`, { count });

  return (
    <div>
      <span>default: {count}</span>
      {` `}
      <button
        onClick={() => dispatchIncrement()}
      >
        Increment default
      </button>
      {` `}
      <button
        onClick={() => dispatchAdd({ amount: 5 })}
      >
        Add 5 to default
      </button>
    </div>
  );
});

type KeyCounterProps = {
  instanceKey: InstanceKey;
};

const KeyCounter = React.memo(function KeyCounter(props: KeyCounterProps) {
  const count = useProp(counterStore.count, props.instanceKey);
  const dispatchAdd = useDispatcher(counterStore.add);
  const dispatchIncrement = useDispatcher(counterStore.increment);

  console.log(`KeyCounter render`, { count, instanceKey: props.instanceKey });

  return (
    <div>
      <span>{String(props.instanceKey)}: {count}</span>
      {` `}
      <button
        onClick={() => dispatchIncrement(props.instanceKey)}
      >
        Increment {String(props.instanceKey)}
      </button>
      {` `}
      <button
        onClick={() => dispatchAdd(props.instanceKey, { amount: 5 })}
      >
        Add 5 to {String(props.instanceKey)}
      </button>
    </div>
  );
});

const ContextCounter = React.memo(function ContextCounter() {
  const count = useProp(counterStore.count);
  const dispatchIncrement = useDispatcher(counterStore.increment);

  console.log(`ContextCounter render`, { count });

  return (
    <div>
      <span>c from context: {count}</span>
      {` `}
      <button
        onClick={() => dispatchIncrement()}
      >
        Increment c
      </button>
    </div>
  );
});

const IncorrectCounter = React.memo(function IncorrectCounter() {
  const count = useProp(counterStore.count);
  // Некорректное использование. Так делать не надо.
  const dispatchIncrement = useDispatcher({ ...counterStore.increment });

  return (
    <div>
      <span>IncorrectCounter default: {count}</span>
      {` `}
      <button
        onClick={() => dispatchIncrement()}
      >
        Increment default incorrectly
      </button>
    </div>
  );
});
