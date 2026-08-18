import type { Payload } from './Payload.tsx';
import type { Reducer } from './Reducer.tsx';

export type ReducerPayload<
  TReducer extends Reducer<any, any> = Reducer<any, any>,
> = Parameters<TReducer>[1] extends Payload ? Parameters<TReducer>[1] : void;
