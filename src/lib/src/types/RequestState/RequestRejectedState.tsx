import type { requestStatus } from '../../requestStatus.ts';
import type { RequestStateMeta } from '../RequestStateMeta.tsx';

export type RequestRejectedState<
  TResponseError extends Error = Error,
  TMeta extends RequestStateMeta = RequestStateMeta,
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
