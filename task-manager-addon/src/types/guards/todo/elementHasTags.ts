import { ListingElement, ListingElementTagged } from '../../interfaces/listings/ListingElement';

/**
 * elementHasTags
 *
 * @param el
 */
export const elementHasTags = (el: ListingElement): el is ListingElementTagged => {
  return (el as ListingElementTagged).tags !== undefined;
};
