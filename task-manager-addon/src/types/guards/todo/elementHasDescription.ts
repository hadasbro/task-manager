import { ListingElement, ListingElementDescription } from '../../interfaces/listings/ListingElement';

/**
 * elementHasDescription
 *
 * @param el
 */
export const elementHasDescription = (el: ListingElement): el is ListingElementDescription => {
  return (el as ListingElementDescription).description !== undefined;
};
