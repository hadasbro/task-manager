/**
 * Dict
 */
export type Dict<V, K extends number | string = string> = {
  [key in K]: V;
};
