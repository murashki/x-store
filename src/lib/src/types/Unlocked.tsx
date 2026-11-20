import type { Locked } from './Locked.tsx';

export type Unlocked<
  TValue = unknown,
> = TValue extends Locked<infer TInnerValue>
  ? TInnerValue
  : TValue;
