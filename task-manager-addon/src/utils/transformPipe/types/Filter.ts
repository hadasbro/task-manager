import { Transformer } from './Transformer';

/**
 * Filter
 */
export interface Filter<T> extends Transformer<T> {
  (el: T): boolean;
}
