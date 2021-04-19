/**
 * ObjectType
 */
export type ObjectType<T> = {
  [P in keyof T]: T[P] extends string ? string : ObjectType<T[P]>;
};
