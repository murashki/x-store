import { LOCKED_FLAG } from '../constants.tsx';

export type Locked<
  TValue = unknown,
> = {
  readonly kind: typeof LOCKED_FLAG;
  readonly value: TValue;
};
