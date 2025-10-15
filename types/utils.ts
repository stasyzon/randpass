/**
 * Utility types for the application
 */

/**
 * Make all properties optional recursively
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Make specific properties required
 */
export type RequireKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * Make specific properties optional
 */
export type OptionalKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Extract promise type
 */
export type Awaited<T> = T extends Promise<infer U> ? U : T;

/**
 * Strict omit type
 */
export type StrictOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/**
 * Value of an object
 */
export type ValueOf<T> = T[keyof T];

/**
 * Make readonly
 */
export type Immutable<T> = {
  readonly [P in keyof T]: T[P];
};
