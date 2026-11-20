import type { Locked } from './types/Locked.tsx';
import { LOCKED_FLAG } from './constants.tsx';

export function LOCKED<
  TValue,
>(value: TValue): Locked<TValue> {
  return Object.freeze({ kind: LOCKED_FLAG, value });
}
