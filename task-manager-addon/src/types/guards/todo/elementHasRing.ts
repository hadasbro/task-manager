import { ListingElement, ListingElementRing } from '../../interfaces/listings/ListingElement';

/**
 * elementHasRing
 *
 * @param el
 */
export const elementHasRing = (el: ListingElement): el is ListingElementRing => {
  return (el as ListingElementRing).ringing !== undefined;
};
