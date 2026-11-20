import type { LockedOverride } from './types/LockedOverride.tsx';
import { LOCKED_OVERRIDE_FLAG } from './constants.tsx';

export function isLockedOverride(value: unknown): value is LockedOverride {
  return typeof value === `object` && value !== null && `kind` in value && value.kind === LOCKED_OVERRIDE_FLAG;
}
