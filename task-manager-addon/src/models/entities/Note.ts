import {
  ListingElementDescription,
  ListingElementStarred,
  ListingElementTagged,
} from '../../types/interfaces/listings/ListingElement';

/**
 * NoteEntity
 */
export default interface NoteEntity extends ListingElementStarred, ListingElementTagged, ListingElementDescription {}
