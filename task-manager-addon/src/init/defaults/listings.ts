import { ListingFilters } from '../../components/templates/ListingProvider/ListingProvider';
import { ListingOrders } from '../../types/interfaces/listings/ListingOrders';

/**
 * defaultListingFilters
 */
export const defaultListingFilters: ListingFilters = {
  search: null,
  tags: [],
  order: ListingOrders.Unspecified,
  starred: 'all',
  pinnedTd: 'any',
  markedDone: 'any',
};
