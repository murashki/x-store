import React from 'react';

import { App as BaseExample } from './examples/BaseExample.tsx';

export const App = React.memo(function App() {
  return (
    <div>
      <BaseExample />
    </div>
  );
});
