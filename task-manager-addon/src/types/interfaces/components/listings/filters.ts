import { Nullable } from '../../../templates/Nullable';
import TagEntity from '../../../../models/entities/Tag';
import { ListingOrders } from '../../listings/ListingOrders';
import { MarkedDoneType, PinnedType, StarredType } from './attributes';

/**
 * ListingFilters
 */
export type ListingFilters = {
  search: Nullable<string>;
  tags: TagEntity['key'][];
  order: ListingOrders;
  starred: StarredType;
  pinnedTd: PinnedType;
  markedDone: MarkedDoneType;
};

/**
 * FiltersUdateHandler
 */
export type FiltersUdateHandler = (filters: Partial<ListingFilters>) => void;
