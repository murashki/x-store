import type { StoreController } from './index.tsx';

export type StoreRegistry = Record<symbol, StoreController>;
