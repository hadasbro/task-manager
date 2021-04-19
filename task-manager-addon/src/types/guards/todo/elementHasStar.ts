import { ListingElement, ListingElementStarred } from '../../interfaces/listings/ListingElement';

/**
 * elementHasStar
 *
 * @param el
 */
export const elementHasStar = (el: ListingElement): el is ListingElementStarred => {
  return (el as ListingElementStarred).star !== undefined;
};
