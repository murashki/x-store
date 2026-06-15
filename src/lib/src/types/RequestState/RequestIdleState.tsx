import type { requestStatus } from '../../requestStatus.tsx';
import type { RequestStateMeta } from '../RequestStateMeta.tsx';

export type RequestIdleState<
  TMeta extends RequestStateMeta = RequestStateMeta,
> = {
  isIdle: true,
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  isAborted: false,
  status: typeof requestStatus.IDLE | typeof requestStatus.FORCE_IDLE;
  error: null;
  meta: null | TMeta;
};
