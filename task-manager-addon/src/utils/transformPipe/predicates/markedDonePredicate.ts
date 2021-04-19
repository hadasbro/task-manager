/* eslint-disable dot-notation */
import { ListingElement as Elem } from '../../../types/interfaces/listings/ListingElement';
import { ListingFilters as Filters } from '../../../components/templates/ListingProvider/ListingProvider';

/**
 * markedDonePredicate
 *
 * check if element is marked as done/read/etc.
 * @param markedDone
 */
export const markedDonePredicate = <T extends Elem>(markedDone: Filters['markedDone']) => (el: T) => {
  if (markedDone === 'any') {
    return true;
  }

  if (markedDone === 'done') {
    return el.done;
  }

  return !el.done;
};
