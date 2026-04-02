import type { StoreController } from './';

export type StoreRegistry = Record<symbol, StoreController>;
