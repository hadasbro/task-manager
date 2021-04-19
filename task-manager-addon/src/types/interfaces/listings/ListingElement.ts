import TagEntity from '../../../models/entities/Tag';
import { EntityID } from '../global/EntityID';
import { ListingItemAddedDate, ListingItemPinneddDate } from './index';

/**
 * ListingElement
 */
export interface ListingElement {
  id: EntityID;
  done: boolean;
  title: string;
  added: ListingItemAddedDate;
}

/**
 * ListingElementDescription
 */
export interface ListingElementDescription extends ListingElement {
  description: string;
}

/**
 * ListingElementStarred
 */
export interface ListingElementStarred extends ListingElement {
  star: boolean;
}

/**
 * ListingElementStarred
 */
export interface ListingElementTagged extends ListingElement {
  tags: TagEntity['key'][];
}

/**
 * ListingElementPinned
 */
export interface ListingElementPinned extends ListingElement {
  pinned: ListingItemPinneddDate;
}

/**
 * ListingElementRing
 */
export interface ListingElementRing extends ListingElement {
  ringing: boolean;
}
