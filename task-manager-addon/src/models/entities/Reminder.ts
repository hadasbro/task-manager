import {
  ListingElement,
  ListingElementPinned,
  ListingElementRing,
} from '../../types/interfaces/listings/ListingElement';

/**
 * ReminderEntity
 */
export default interface ReminderEntity extends ListingElement, ListingElementPinned, ListingElementRing {}
