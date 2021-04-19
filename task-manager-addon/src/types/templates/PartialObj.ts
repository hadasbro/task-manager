import { MandatoryObj } from './MandatoryObj';

/**
 * PartialObj
 *
 * interface A {
 *   a: string,
 *   b: string,
 *   c: number,
 * }
 *
 * const elem: PartialObj<A, 'a' | 'c'> = {
 *   a: string,
 *   c: number,
 * }
 */
export type PartialObj<T, K extends keyof T> = MandatoryObj<Pick<T, K>>;
