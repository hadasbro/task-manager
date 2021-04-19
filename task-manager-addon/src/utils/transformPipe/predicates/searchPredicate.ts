/* eslint-disable dot-notation */
import _ from 'lodash';
import { ListingElement as Elem } from '../../../types/interfaces/listings/ListingElement';
import { ListingFilters as Filters } from '../../../components/templates/ListingProvider/ListingProvider';
import { elementHasDescription } from '../../../types/guards/todo/elementHasDescription';

/**
 * searchPredicate
 *
 * check if element contains phrase
 *
 * @param search
 */
export const searchPredicate = <T extends Elem>(search: Filters['search']) => (el: T) => {
  const phr = _.trim(search || '').toLowerCase();

  if (!phr) {
    return true;
  }

  if (!elementHasDescription(el)) {
    return el.title.includes(phr);
  }

  return el.description.toLowerCase().includes(phr) || el.title.toLowerCase().includes(phr);
};
