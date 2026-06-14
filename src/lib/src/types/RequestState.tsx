import type { RequestAbortedState } from './RequestState/RequestAbortedState.tsx';
import type { RequestFulfilledState } from './RequestState/RequestFulfilledState.tsx';
import type { RequestIdleState } from './RequestState/RequestIdleState.tsx';
import type { RequestPendingState } from './RequestState/RequestPendingState.tsx';
import type { RequestRejectedState } from './RequestState/RequestRejectedState.tsx';
import type { RequestStateMeta } from './RequestStateMeta.tsx';

export type RequestState<
  TError extends Error = Error,
  TMeta extends RequestStateMeta = RequestStateMeta,
> =
  | RequestIdleState<TMeta>
  | RequestPendingState<TMeta>
  | RequestFulfilledState<TMeta>
  | RequestRejectedState<TError, TMeta>
  | RequestAbortedState<TMeta>;
