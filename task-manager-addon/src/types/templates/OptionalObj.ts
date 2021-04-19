/**
 * OptionalObj
 */
export type OptionalObj<T> = {
  [P in keyof T]?: T[P];
};
