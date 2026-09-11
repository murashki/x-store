import type { InstanceKey } from '../InstanceKey.tsx';

export type IsInitialized = {
  (
    instanceKey: InstanceKey,
  ): boolean;
};
