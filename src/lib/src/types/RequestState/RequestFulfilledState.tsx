import type { requestStatus } from '../../requestStatus.ts';
import type { RequestStateMeta } from '../RequestStateMeta.tsx';

export type RequestFulfilledState<
  TMeta extends RequestStateMeta = RequestStateMeta,
> = {
  isIdle: false,
  isPending: false,
  isFulfilled: true,
  isRejected: false,
  isAborted: false,
  status: typeof requestStatus.FULFILLED | typeof requestStatus.FORCE_FULFILLED;
  error: null;
  meta: null | TMeta;
};
