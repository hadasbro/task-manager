/**
 * NullableObj
 */
export type NullableObj<T> = {
  [P in keyof T]: T[P] | null;
};
