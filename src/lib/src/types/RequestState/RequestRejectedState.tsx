import type { requestStatus } from '../../requestStatus.tsx';
import type { RequestStateMeta } from '../RequestStateMeta.tsx';

export type RequestRejectedState<
  TMeta extends RequestStateMeta = RequestStateMeta,
  TResponseError extends unknown = unknown,
> = {
  isIdle: false,
  isPending: false,
  isFulfilled: false,
  isRejected: true,
  isAborted: false,
  status: typeof requestStatus.REJECTED | typeof requestStatus.FORCE_REJECTED;
  error: null | TResponseError;
  meta: null | TMeta;
};
