import type { requestStatus } from '../../requestStatus.tsx';
import type { RequestStateMeta } from '../RequestStateMeta.tsx';

export type RequestPendingState<
  TMeta extends RequestStateMeta = RequestStateMeta,
> = {
  isIdle: false,
  isPending: true,
  isFulfilled: false,
  isRejected: false,
  isAborted: false,
  status: typeof requestStatus.PENDING | typeof requestStatus.FORCE_PENDING;
  error: null;
  meta: null | TMeta;
};
