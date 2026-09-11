import type { InstanceKey } from '../InstanceKey.tsx';

export type PruneInstance = {
  (
    instanceKey: InstanceKey,
  ): void;
};
