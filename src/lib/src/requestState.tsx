import type { RequestAbortedState } from './types/RequestState/RequestAbortedState.tsx';
import type { RequestFulfilledState } from './types/RequestState/RequestFulfilledState.tsx';
import type { RequestIdleState } from './types/RequestState/RequestIdleState.tsx';
import type { RequestPendingState } from './types/RequestState/RequestPendingState.tsx';
export type { RequestState } from './types/RequestState.tsx';
import type { RequestRejectedState } from './types/RequestState/RequestRejectedState.tsx';
import type { RequestStateMeta } from './types/RequestStateMeta.tsx';
import { requestStateDefault } from './requestStateDefault.tsx';
import { requestStatus } from './requestStatus.tsx';

export const requestState = {
  idle: <
    TMeta extends RequestStateMeta = RequestStateMeta,
  >(meta?: null | TMeta): RequestIdleState<TMeta> => {
    return {
      ...requestStateDefault,
      isIdle: true,
      status: requestStatus.IDLE,
      error: null,
      meta: meta ?? null,
    };
  },
  pending: <
    TMeta extends RequestStateMeta = RequestStateMeta,
  >(meta?: null | TMeta): RequestPendingState<TMeta> => {
    return {
      ...requestStateDefault,
      isPending: true,
      status: requestStatus.PENDING,
      error: null,
      meta: meta ?? null,
    };
  },
  fulfilled: <
    TMeta extends RequestStateMeta = RequestStateMeta,
  >(meta?: null | TMeta): RequestFulfilledState<TMeta> => {
    return {
      ...requestStateDefault,
      isFulfilled: true,
      status: requestStatus.FULFILLED,
      meta: meta ?? null,
      error: null,
    };
  },
  rejected: <
    TError extends Error = Error,
    TMeta extends RequestStateMeta = RequestStateMeta,
  >(error?: null | TError, meta?: null | TMeta): RequestRejectedState<TError, TMeta> => {
    return {
      ...requestStateDefault,
      isRejected: true,
      status: requestStatus.REJECTED,
      error: error ?? null,
      meta: meta ?? null,
    };
  },
  aborted: <
    TMeta extends RequestStateMeta = RequestStateMeta,
  >(meta?: null | TMeta): RequestAbortedState<TMeta> => {
    return {
      ...requestStateDefault,
      isAborted: true,
      status: requestStatus.ABORTED,
      meta: meta ?? null,
      error: null,
    };
  },
  forceIdle: <
    TMeta extends RequestStateMeta = RequestStateMeta,
  >(meta?: null | TMeta): RequestIdleState<TMeta> => {
    return requestState.idle<TMeta>(meta);
  },
  forcePending: <
    TMeta extends RequestStateMeta = RequestStateMeta,
  >(meta?: null | TMeta): RequestPendingState<TMeta> => {
    return requestState.pending<TMeta>(meta);
  },
  forceFulfilled: <
    TMeta extends RequestStateMeta = RequestStateMeta,
  >(meta?: null | TMeta): RequestFulfilledState<TMeta> => {
    return requestState.fulfilled<TMeta>(meta);
  },
  forceRejected: <
    TError extends Error = Error,
    TMeta extends RequestStateMeta = RequestStateMeta,
  >(error?: null | TError, meta?: null | TMeta): RequestRejectedState<TError, TMeta> => {
    return requestState.rejected<TError, TMeta>(error, meta);
  },
  forceAborted: <
    TMeta extends RequestStateMeta = RequestStateMeta,
  >(meta?: null | TMeta): RequestAbortedState<TMeta> => {
    return requestState.aborted<TMeta>(meta);
  },
};
