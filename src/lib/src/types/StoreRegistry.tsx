import type { StoreController } from './StoreController.tsx';

export type StoreRegistry = Record<symbol, StoreController>;
