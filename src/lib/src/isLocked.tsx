import type { Locked } from './types/Locked.tsx';
import { LOCKED_FLAG } from './constants.tsx';

export function isLocked(value: unknown): value is Locked {
  return typeof value === `object` && value !== null && `kind` in value && value.kind === LOCKED_FLAG;
}
