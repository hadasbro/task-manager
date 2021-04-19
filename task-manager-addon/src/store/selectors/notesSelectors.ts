import { createSelector } from '@reduxjs/toolkit';
import { notesSliceInitialState } from '../redux/slices/notesSlice';
import { ListingFilters } from '../../types/interfaces/components/listings/filters';
import { AppState } from '../redux/AppState';
import { NotesState } from '../redux/state/NotesState';
import { pipe } from '../../utils/transformPipe/pipe';
import { Nullable } from '../../types/templates/Nullable';
import { ListingElementData } from '../../components/organisms/ListingElementForm/ListingElementForm';
import NoteEntity from '../../models/entities/Note';

/**
 * filterNotes
 *
 * Configured filter function used to filter Notes
 */
const filterNotes = pipe();

/**
 * notesSelector
 *
 * @param state
 */
const notesSelector = (state: AppState): NotesState => state.notesSlice || notesSliceInitialState;

/**
 * filterSelector
 *
 * @param state
 */
const notesFilterSelector = (state: AppState): ListingFilters =>
  state.notesSlice.filters || notesSliceInitialState.filters;

/**
 * selectAllNotes
 */
export const selectAllNotes = createSelector(notesSelector, ts => ts.notesList);

/**
 * selectTodoFilters
 */
export const selectNotesFilters = createSelector(notesFilterSelector, ts => ts);

/**
 * selectFilteredNotes
 */
export const selectFilteredNotes = createSelector([selectAllNotes, selectNotesFilters], (notes, filters) => {
  const allElements = Object.values(notes);
  return filterNotes(allElements, filters).reduce((acc, el) => {
    return { ...acc, [el.id]: el };
  }, {});
});

/**
 * selectFilteredNotesCount
 */
export const selectFilteredNotesCount = createSelector(selectFilteredNotes, notes => {
  return Object.keys(notes).length;
});
