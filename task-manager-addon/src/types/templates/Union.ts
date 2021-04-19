/**
 * Union
 */
export type Union<T> = T extends [infer A, infer A] ? A : never;
