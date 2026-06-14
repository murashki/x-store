import type { RequestAbortedState } from './RequestState/RequestAbortedState.ts';
import type { RequestFulfilledState } from './RequestState/RequestFulfilledState.ts';
import type { RequestIdleState } from './RequestState/RequestIdleState.ts';
import type { RequestPendingState } from './RequestState/RequestPendingState.ts';
import type { RequestRejectedState } from './RequestState/RequestRejectedState.ts';
import type { RequestStateMeta } from './RequestStateMeta.ts';

export type RequestState<
  TError extends Error = Error,
  TMeta extends RequestStateMeta = RequestStateMeta,
> =
  | RequestIdleState<TMeta>
  | RequestPendingState<TMeta>
  | RequestFulfilledState<TMeta>
  | RequestRejectedState<TError, TMeta>
  | RequestAbortedState<TMeta>;
