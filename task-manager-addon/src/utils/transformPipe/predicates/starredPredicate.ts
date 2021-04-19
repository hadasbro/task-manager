/* eslint-disable dot-notation */
import { ListingElement as Elem } from '../../../types/interfaces/listings/ListingElement';
import { ListingFilters as Filters } from '../../../components/templates/ListingProvider/ListingProvider';
import { elementHasStar } from '../../../types/guards/todo/elementHasStar';

/**
 * starredPredicate
 *
 * check if element is starred
 *
 * @param starred
 */
export const starredPredicate = <T extends Elem>(starred: Filters['starred']) => (el: T) => {
  if (!elementHasStar(el)) {
    return true;
  }
  return starred === 'all' ? true : Boolean(el.star);
};
