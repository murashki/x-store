import { useState } from 'react';
import React from 'react';

import type { Patch } from '../lib/src';
import { createStore } from '../lib/src';
import { useDispatcher } from '../lib/src';
import { useProp } from '../lib/src';
import { useStore } from '../lib/src';

type PageState = {
  pageId: string;
  title: string;
  visits: number;
};

const initialPageState: PageState = {
  pageId: ``,
  title: ``,
  visits: 0,
};

const pageStore = createStore(`page`, initialPageState, {
  $$init: (state, payload): Patch<PageState> => {
    console.log(`page $$init`, { payload, state });

    return {
      title: `Page ${state.pageId}`,
    };
  },
  $$reset: (state): Patch<PageState> => {
    console.log(`page $$reset`, { state });

    return {};
  },
  visit: (state): Patch<PageState> => {
    return {
      visits: state.visits + 1,
    };
  },
});

export const App = React.memo(function App() {
  const [pageVisible, setPageVisible] = useState(false);

  console.log(`App render`, { pageVisible });

  return (
    <div>
      <button
        onClick={() => setPageVisible( ! pageVisible)}
      >
        {pageVisible ? `Hide page` : `Show page`}
      </button>
      <PageStatus />
      {pageVisible
        ? (
          <>
            <Page />
            <IncorrectDuplicateInit />
            <IncorrectStoreReference />
          </>
        )
        : null}
    </div>
  );
});

const PageStatus = React.memo(function PageStatus() {
  const initialized = useProp(pageStore.$$initialized);
  const pageId = useProp(pageStore.pageId);
  const title = useProp(pageStore.title);
  const visits = useProp(pageStore.visits);

  console.log(`PageStatus render`, { initialized, pageId, title, visits });

  return (
    <div>
      PageStatus initialized: {String(initialized)}, pageId: {pageId}, title: {title}, visits: {visits}
    </div>
  );
});

const Page = React.memo(function Page() {
  const dispatchVisit = useDispatcher(pageStore.visit);

  console.log(`Page render`);

  useStore(pageStore, (init) => {
    return init({ pageId: `page-1` });
  });

  return (
    <div>
      <button
        onClick={() => dispatchVisit()}
      >
        Visit
      </button>
    </div>
  );
});

const IncorrectDuplicateInit = React.memo(function IncorrectDuplicateInit() {
  // Некорректное использование. Так делать не надо.
  useStore(pageStore, (init) => {
    return init({ pageId: `page-2` });
  });

  return (
    <div>IncorrectDuplicateInit</div>
  );
});

const IncorrectStoreReference = React.memo(function IncorrectStoreReference() {
  const visits = useProp(pageStore.visits);

  // Некорректное использование. Так делать не надо.
  useStore({ ...pageStore }, (init) => {
    return init({ pageId: `page-3` });
  });

  return (
    <div>IncorrectStoreReference visits: {visits}</div>
  );
});
