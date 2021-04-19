import { Dict } from '../../../types/templates/Dict';
import { ListingFilters } from '../../../types/interfaces/components/listings/filters';
import NoteEntity from '../../../models/entities/Note';
import { Nullable } from '../../../types/templates/Nullable';

/**
 * NotesState
 */
export interface NotesState {
  notesList: Dict<NoteEntity>;
  filters: ListingFilters;
  editedElementId: Nullable<NoteEntity['id']>;
}
