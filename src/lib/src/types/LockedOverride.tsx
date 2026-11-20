import { LOCKED_OVERRIDE_FLAG } from '../constants.tsx';

export type LockedOverride<
  TValue = unknown,
> = {
  readonly kind: typeof LOCKED_OVERRIDE_FLAG;
  readonly value: TValue;
};
