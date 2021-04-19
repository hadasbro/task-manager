/* eslint-disable dot-notation */
import { ListingElement as Elem } from '../../types/interfaces/listings/ListingElement';
import { ListingFilters as Filters } from '../../components/templates/ListingProvider/ListingProvider';
import { searchPredicate } from './predicates/searchPredicate';
import { tagsPredicate } from './predicates/tagsPredicate';
import { starredPredicate } from './predicates/starredPredicate';
import { pinnedTdPredicate } from './predicates/pinnedTdPredicatea';
import { markedDonePredicate } from './predicates/markedDonePredicate';
import { sort } from './sort';
import { BuilderOptions } from './types/BuilderOptions';

/**
 * pipe
 *
 * @param options
 */
export const pipe = (options?: BuilderOptions) => {
  const allFilters: any[] = [];

  // check features we want and add them to the pipe
  const opts = {
    search: true,
    tags: true,
    starred: true,
    pinnedTd: true,
    markedDone: true,
    sorter: true,
    ...(options || {}),
  };

  if (opts.search) {
    allFilters['search'] = searchPredicate;
  }

  if (opts.tags) {
    allFilters['tags'] = tagsPredicate;
  }

  if (opts.starred) {
    allFilters['starred'] = starredPredicate;
  }

  if (opts.pinnedTd) {
    allFilters['pinnedTd'] = pinnedTdPredicate;
  }

  if (opts.markedDone) {
    allFilters['markedDone'] = markedDonePredicate;
  }

  if (opts.sorter) {
    // allFilters['sort'] = sort;
  }

  return (elements: Elem[], filter: Filters) => {
    // const aa = transformPipe22<T>(sort, filters);

    const filtered = elements
      .filter(searchPredicate(filter.search))
      .filter(tagsPredicate(filter.tags))
      .filter(starredPredicate(filter.starred))
      .filter(pinnedTdPredicate(filter.pinnedTd))
      .filter(markedDonePredicate(filter.markedDone))
      .sort(sort(filter.order));

    return filtered;
  };
};
