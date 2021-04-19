/* eslint-disable dot-notation */
import { dayjsExt } from '../../extensions/dayjs';
import { ListingElement as Elem } from '../../types/interfaces/listings/ListingElement';
import { ListingFilters as Filters } from '../../components/templates/ListingProvider/ListingProvider';
import { ListingOrders } from '../../types/interfaces/listings/ListingOrders';
import { elementIsPinned } from '../../types/guards/todo/elementIsPinned';

/**
 * sort
 *
 * ORDER BY
 *
 * @param order
 */
export const sort = <T extends Elem>(order: Filters['order']) => (el1: T, el2: T): number => {
  const initDt = { years: 1900 };

  if (order) {
    switch (order) {
      case ListingOrders.AddedDateAsc:
        return dayjsExt(el1.added || initDt) < dayjsExt(el2.added || initDt) ? 1 : -1;

      case ListingOrders.AddedDateDesc:
        return dayjsExt(el1.added || initDt) < dayjsExt(el2.added || initDt) ? -1 : 1;

      case ListingOrders.PinnedDateAsc:
        if (!elementIsPinned(el1) || !elementIsPinned(el2)) {
          return 1;
        }
        return dayjsExt(el1.pinned || initDt) < dayjsExt(el2.pinned || initDt) ? 1 : -1;

      case ListingOrders.PinnedDateDesc:
        if (!elementIsPinned(el1) || !elementIsPinned(el2)) {
          return 1;
        }
        return dayjsExt(el1.pinned || initDt) < dayjsExt(el2.pinned || initDt) ? -1 : 1;

      case ListingOrders.Unspecified:
      default:
        return 0;
    }
  }

  return 0;
};
