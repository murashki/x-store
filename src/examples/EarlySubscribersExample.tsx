import { useEffect } from 'react';
import { useState } from 'react';
import React from 'react';

import type { InstanceKey } from '../lib/src';
import { createStore } from '../lib/src';
import { StoreProvider } from '../lib/src';
import { useProp } from '../lib/src';
import { usePropAll } from '../lib/src';
import { useStore } from '../lib/src';

type LabelState = {
  label: string;
};

const initialLabelState: LabelState = {
  label: `initial`,
};

const labelStore = createStore(`label`, initialLabelState, {
  $$init: (state): LabelState => {
    return {
      ...state,
      label: `${state.label} (после $$init)`,
    };
  },
  $$reset: (state): LabelState => {
    return state;
  },
});

export const App = React.memo(function App() {
  const [siblingOwnerMounted, setSiblingOwnerMounted] = useState(true);

  console.log(`App render`);

  useEffect(() => {
    console.log(`App effect`);
  });

  return (
    <div>
      <h3>Владелец выше читателя</h3>
      <StoreProvider
        instanceKey={`parent`}
        prefill={{ label: `prefill` }}
        store={labelStore}
      >
        <Reader />
      </StoreProvider>

      <h3>Владелец-сосед перед читателем</h3>
      <div>
        <button
          onClick={() => setSiblingOwnerMounted((mounted) => ! mounted)}
        >
          {siblingOwnerMounted ? `Unmount sibling owner` : `Mount sibling owner`}
        </button>
      </div>
      {siblingOwnerMounted
        ? <SiblingOwner instanceKey={`sibling`} />
        : null}
      <Reader instanceKey={`sibling`} />

      <h3>Все экземпляры через usePropAll</h3>
      <AllReaders />
    </div>
  );
});

const AllReaders = React.memo(function AllReaders() {
  const labels = usePropAll(labelStore.label);

  console.log(`AllReaders render`, { labels });

  return (
    <div>
      {labels.map(([instanceKey, label]) => (
        <div key={String(instanceKey)}>
          {String(instanceKey)}: {label}
        </div>
      ))}
      <div>всего: {labels.length}</div>
    </div>
  );
});

const SiblingOwner = React.memo(function SiblingOwner(props: { instanceKey: InstanceKey }) {
  console.log(`SiblingOwner render`);

  useEffect(() => {
    console.log(`SiblingOwner effect`);
  });

  useStore(labelStore, [props.instanceKey], (init) => {
    return init();
  });

  return null;
});

const Reader = React.memo(function Reader(props: { instanceKey?: InstanceKey }) {
  const initialized = useProp(labelStore.$$initialized, props.instanceKey);
  const instanceKey = useProp(labelStore.$$instanceKey, props.instanceKey);
  const label = useProp(labelStore.label, props.instanceKey);

  console.log(`Reader render`, { initialized, instanceKey, label });

  useEffect(() => {
    console.log(`Reader effect`, { instanceKey });
  });

  return (
    <div>
      <div>instanceKey: {String(instanceKey)}</div>
      <div>initialized: {String(initialized)}</div>
      <div>label: {label}</div>
    </div>
  );
});
