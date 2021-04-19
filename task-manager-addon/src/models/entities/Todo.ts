import {
  ListingElementDescription,
  ListingElementPinned,
  ListingElementStarred,
  ListingElementTagged,
} from '../../types/interfaces/listings/ListingElement';

/**
 * TodoEntity
 */
export default interface TodoEntity
  extends ListingElementStarred,
    ListingElementDescription,
    ListingElementTagged,
    ListingElementPinned {}
