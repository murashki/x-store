import type { InstanceKey } from '../InstanceKey.tsx';

export type GetIsInitialized = {
  (
    instanceKey: InstanceKey,
  ): boolean;
};
