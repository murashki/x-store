import type { LockedOverride } from './types/LockedOverride.tsx';
import { LOCKED_OVERRIDE_FLAG } from './constants.tsx';

export function OVERRIDE_LOCKED<
  TValue extends null | NonNullable<unknown>,
>(value: TValue): LockedOverride<TValue> {
  return Object.freeze({ kind: LOCKED_OVERRIDE_FLAG, value });
}
