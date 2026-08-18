import React from 'react';
import { BrowserRouter } from 'react-router';
import { Link } from 'react-router';
import { Route } from 'react-router';
import { Routes } from 'react-router';

import { App as BaseExample } from './examples/BaseExample.tsx';
import { App as ContextExample } from './examples/ContextExample.tsx';
import { App as DuplicateInitExample } from './examples/DuplicateInitExample.tsx';

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
            <Link to={`/duplicate-init-example`}>DuplicateInitExample</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path={`/base-example`} element={<BaseExample />} />
        <Route path={`/context-example`} element={<ContextExample />} />
        <Route path={`/duplicate-init-example`} element={<DuplicateInitExample />} />
      </Routes>
    </BrowserRouter>
  );
});
