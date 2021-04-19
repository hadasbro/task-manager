import { Transformer } from './Transformer';

/**
 * Sorter
 */
export interface Sorter<T> extends Transformer<T> {
  (el1: T, el2: T): -1 | 0 | 1;
}
