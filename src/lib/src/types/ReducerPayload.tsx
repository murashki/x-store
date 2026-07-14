import type { Payload } from './index.tsx';
import type { Reducer } from './index.tsx';

export type ReducerPayload<
  TReducer extends Reducer<any, any> = Reducer<any, any>,
> = Parameters<TReducer>[1] extends Payload ? Parameters<TReducer>[1] : void;
