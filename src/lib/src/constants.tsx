export const DEFAULT_INSTANCE_KEY: unique symbol = Symbol(`DEFAULT_INSTANCE_KEY`);

export const DESTROY: unique symbol = Symbol(`DESTROY_INSTRUCTION`);

export const INITIALIZED_STATE_NAME = `$$initialized` as const;

export const INSTANCE_KEY_STATE_NAME = `$$instanceKey` as const;

export const INTERNAL_BUG_MESSAGE = `This must never happen and may mean a bug inside the library itself. Please report it to the library developers.`;

export const INTERNAL_STORE_PROPS_ACCESSOR: unique symbol = Symbol(`INTERNAL_STORE_PROPS`);

export const REDUCER_LINK: unique symbol = Symbol(`REDUCER_LINK`);

export const STATE_LINK: unique symbol = Symbol(`STATE_LINK`);

export const STORE_INSTANCE_UNREGISTERED: unique symbol = Symbol(`STORE_INSTANCE_UNREGISTERED_INSTRUCTION`);
