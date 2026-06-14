import type { RequestAbortedState } from './types/RequestState/RequestAbortedState.ts';
import type { RequestFulfilledState } from './types/RequestState/RequestFulfilledState.ts';
import type { RequestIdleState } from './types/RequestState/RequestIdleState.ts';
import type { RequestPendingState } from './types/RequestState/RequestPendingState.ts';
export type { RequestState } from './types/RequestState.ts';
import type { RequestRejectedState } from './types/RequestState/RequestRejectedState.ts';
import type { RequestStateMeta } from './types/RequestStateMeta.ts';
import { requestStateDefault } from './requestStateDefault.ts';
import { requestStatus } from './requestStatus.ts';

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
