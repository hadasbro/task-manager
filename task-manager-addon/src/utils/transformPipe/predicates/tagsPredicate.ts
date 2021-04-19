/* eslint-disable dot-notation */
import _ from 'lodash';
import { ListingElement as Elem } from '../../../types/interfaces/listings/ListingElement';
import { ListingFilters as Filters } from '../../../components/templates/ListingProvider/ListingProvider';
import { elementHasTags } from '../../../types/guards/todo/elementHasTags';

/**
 * tagsPredicate
 *
 * check if element contains one or more required tags
 *
 * @param tags
 */
export const tagsPredicate = <T extends Elem>(tags: Filters['tags']) => (el: T) => {
  if (!elementHasTags(el)) {
    return true;
  }

  if (!tags.length) {
    return true;
  }

  return _.intersection(el.tags, tags).length > 0;
};
