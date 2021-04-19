import { Nullable } from '../../types/templates/Nullable';
import { Sorter } from './types/Sorter';
import { Filter } from './types/Filter';

/**
 * transformer
 *
 * pipe with transformers for any array of elements
 *
 * @param sorter
 * @param filters
 */
export const transformer = <T>(sorter: Nullable<Sorter<T>>, filters: Filter<T>[]): ((args: T[]) => T[]) => {
  /**
   * Apply all filters, sorters, mappers one by one
   * e.g. sort(filter(mapper(anotherFilter( collection ))))
   */
  return (elements: T[]) => {
    return filters
      .reduce((prev: T[], func: Filter<T>) => {
        return prev.filter(func);
      }, elements)
      .sort(sorter || (() => 0));
  };
};

// // <T>(sort: Nullable<Sorter<T>>, filters: Filter<T>[]):
// export const transformPipe22 = filters => {
//   // elements
//   //   .filter(el => searchPredicate(filter.search)(el))
//   //   .filter(el => starPredicate(el, filter.search));
//   //
//   // const returnaa = (elements, appliedFilter) => {
//   //   return filters.reduce((prev: T[], func: Filter<T>) => {
//   //     return prev.filter(func);
//   //   }, elements);
//   //
//   //   // elements
//   //   //   .filter(el => serachPredicate(el, appliedFilter.search))
//   //   //   .filter(el => starPredicate(el, appliedFilter.search));
//   // };
//   //
//   // return returnaa;
//   // /**
//   //  * Apply all filters, sorters, mappers one by one
//   //  * e.g. sort(filter(mapper(anotherFilter( collection ))))
//   //  */
//   // return (elements: T[]) => {
//   //   return filters
//   //     .reduce((prev: T[], func: Filter<T>) => {
//   //       return prev.filter(func);
//   //     }, elements)
//   //     .sort(sort || (() => 0));
//   // };
// };
