import { isLocked } from './isLocked.tsx';
import { isLockedOverride } from './isLockedOverride.tsx';

export function unlock(value: unknown): unknown {
  if (isLocked(value) || isLockedOverride(value)) {
    return value.value;
  }
  else {
    return value;
  }
}
