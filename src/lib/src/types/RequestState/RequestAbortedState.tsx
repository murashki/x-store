import type { requestStatus } from '../../requestStatus.ts';
import type { RequestStateMeta } from '../RequestStateMeta.tsx';

export type RequestAbortedState<
  TMeta extends RequestStateMeta = RequestStateMeta,
> = {
  isIdle: false,
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  isAborted: true,
  status: typeof requestStatus.ABORTED | typeof requestStatus.FORCE_ABORTED;
  error: null;
  meta: null | TMeta;
};
