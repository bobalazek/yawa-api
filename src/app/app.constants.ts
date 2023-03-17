export const NODE_ENV = process.env.NODE_ENV;
export const IS_PRODUCTION = NODE_ENV === 'prod';

export const POSTGRESQL_URL = process.env.POSTGRESQL_URL as string;
