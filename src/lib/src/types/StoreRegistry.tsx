import type { InternalStore } from '../InternalStore.tsx';

export type StoreRegistry = Record<symbol, InternalStore>;
