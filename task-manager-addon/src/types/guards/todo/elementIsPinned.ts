import { ListingElement, ListingElementPinned } from '../../interfaces/listings/ListingElement';

/**
 * elementIsPinned
 *
 * @param el
 */
export const elementIsPinned = (el: ListingElement): el is ListingElementPinned => {
  return (el as ListingElementPinned).pinned !== undefined;
};
