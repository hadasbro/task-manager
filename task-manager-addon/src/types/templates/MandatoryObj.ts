/**
 * MandatoryObj
 */
export type MandatoryObj<T> = {
  [P in keyof T]: T[P];
};
