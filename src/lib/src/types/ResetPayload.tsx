import type { ReducerMap } from './index.tsx';
import type { ReducerPayload } from './index.tsx';

export type ResetPayload<
  TReducerMap extends ReducerMap<any> = ReducerMap<any>,
> = ReducerPayload<TReducerMap[`$$reset`]>;
