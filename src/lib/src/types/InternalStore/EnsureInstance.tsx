import type { InstanceKey } from '../InstanceKey.tsx';

export type EnsureInstance = {
  (
    instanceKey: InstanceKey,
  ): void;
};
