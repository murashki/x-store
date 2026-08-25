import { STORE_INSTANCE_UNREGISTERED } from '../constants.tsx';

export type ResetInstance = {
  (): typeof STORE_INSTANCE_UNREGISTERED;
};
