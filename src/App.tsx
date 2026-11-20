import React from 'react';
import { BrowserRouter } from 'react-router';
import { Link } from 'react-router';
import { Route } from 'react-router';
import { Routes } from 'react-router';

import { App as BaseExample } from './examples/BaseExample.tsx';
import { App as ContextExample } from './examples/ContextExample.tsx';
import { App as EarlyDispatchExample } from './examples/EarlyDispatchExample.tsx';
import { App as EarlySubscribersExample } from './examples/EarlySubscribersExample.tsx';
import { App as InitResetExample } from './examples/InitResetExample.tsx';
import { App as LockedExample } from './examples/LockedExample.tsx';
import { App as UseDispatcherExample } from './examples/UseDispatcherExample.tsx';
import { App as UsePropAllExample } from './examples/UsePropAllExample.tsx';
import { App as UsePropExample } from './examples/UsePropExample.tsx';
import { App as UsePropSelectorAllExample } from './examples/UsePropSelectorAllExample.tsx';
import { App as UsePropSelectorExample } from './examples/UsePropSelectorExample.tsx';

export const App = React.memo(function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to={`/base-example`}>BaseExample</Link>
          </li>
          <li>
            <Link to={`/context-example`}>ContextExample</Link>
          </li>
          <li>
            <Link to={`/early-dispatch-example`}>EarlyDispatchExample</Link>
          </li>
          <li>
            <Link to={`/early-subscribers-example`}>EarlySubscribersExample</Link>
          </li>
          <li>
            <Link to={`/init-reset-example`}>InitResetExample</Link>
          </li>
          <li>
            <Link to={`/locked-example`}>LockedExample</Link>
          </li>
          <li>
            <Link to={`/use-dispatcher-example`}>UseDispatcherExample</Link>
          </li>
          <li>
            <Link to={`/use-prop-example`}>UsePropExample</Link>
          </li>
          <li>
            <Link to={`/use-prop-all-example`}>UsePropAllExample</Link>
          </li>
          <li>
            <Link to={`/use-prop-selector-example`}>UsePropSelectorExample</Link>
          </li>
          <li>
            <Link to={`/use-prop-selector-all-example`}>UsePropSelectorAllExample</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path={`/base-example`} element={<BaseExample />} />
        <Route path={`/context-example`} element={<ContextExample />} />
        <Route path={`/early-dispatch-example`} element={<EarlyDispatchExample />} />
        <Route path={`/early-subscribers-example`} element={<EarlySubscribersExample />} />
        <Route path={`/init-reset-example`} element={<InitResetExample />} />
        <Route path={`/locked-example`} element={<LockedExample />} />
        <Route path={`/use-dispatcher-example`} element={<UseDispatcherExample />} />
        <Route path={`/use-prop-example`} element={<UsePropExample />} />
        <Route path={`/use-prop-all-example`} element={<UsePropAllExample />} />
        <Route path={`/use-prop-selector-example`} element={<UsePropSelectorExample />} />
        <Route path={`/use-prop-selector-all-example`} element={<UsePropSelectorAllExample />} />
      </Routes>
    </BrowserRouter>
  );
});
