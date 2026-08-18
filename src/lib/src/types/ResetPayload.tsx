import type { ReducerMap } from './ReducerMap.tsx';
import type { ReducerPayload } from './ReducerPayload.tsx';

export type ResetPayload<
  TReducerMap extends ReducerMap<any> = ReducerMap<any>,
> = ReducerPayload<TReducerMap[`$$reset`]>;
