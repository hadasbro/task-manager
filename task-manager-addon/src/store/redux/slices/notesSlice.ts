/* eslint-disable no-param-reassign */
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'store/utils/toolkit/helpers';
import NoteEntity from '../../../models/entities/Note';
import { dayjsObj } from '../../../extensions/dayjs';
import { ListingFilters } from '../../../types/interfaces/components/listings/filters';
import { ListingElementData } from '../../../components/organisms/ListingElementForm/ListingElementForm';
import { NotesState } from '../state/NotesState';
import { createKey } from '../../../functions/general/createKey';
import { defaultListingFilters } from '../../../init/defaults/listings';
import { defaultNotesList } from '../../../init/defaults/notes';
import ValidationException from '../../../exceptions/system/ValidationException';
import { Nullable } from '../../../types/templates/Nullable';
import { validateNote } from '../../../functions/validators/validateNote';
import { validateReminder } from '../../../functions/validators/validateReminder';
import { EntityID } from '../../../types/interfaces/global/EntityID';
import { ListingItemPinneddDate } from '../../../types/interfaces/listings';
import TagEntity from '../../../models/entities/Tag';

/**
 * notesSliceInitialState
 */
export const notesSliceInitialState: NotesState = {
  notesList: defaultNotesList,
  filters: defaultListingFilters,
  editedElementId: null,
};

/**
 * notesSlice
 */
const notesSlice = createSlice({
  name: 'notesSlice',
  initialState: notesSliceInitialState,
  reducers: {
    /**
     * addNewNote
     *
     * @param state
     * @param noteFormData
     */
    addNewNote: (state, { payload: noteFormData }: PayloadAction<ListingElementData>) => {
      if (validateNote(noteFormData)) {
        const newNote: NoteEntity = {
          id: createKey(),
          added: dayjsObj(),
          done: noteFormData.done,
          title: noteFormData.title,
          description: noteFormData.description,
          star: noteFormData.star,
          tags: noteFormData.tags,
        };

        state.notesList = {
          ...state.notesList,
          [newNote.id]: newNote,
        };
      }
    },

    /**
     * updateReminder
     *
     * @param state
     * @param data
     */
    updateNote: (state, { payload: data }: PayloadAction<ListingElementData>) => {
      if (validateNote(data, 'edit')) {
        state.notesList[data.entityId!] = {
          ...state.notesList[data.entityId!],
          title: data.title,
          star: data.star,
          done: data.done,
          description: data.description,
          tags: data.tags,
        };
      }
    },

    /**
     * toggleDone
     *
     * @param state
     * @param id
     */
    toggleDone: (state, { payload: id }: PayloadAction<NoteEntity['id']>) => {
      state.notesList[id].done = !state.notesList[id].done;
    },

    /**
     * toggleStar
     *
     * @param state
     * @param id
     */
    toggleStar: (state, { payload: id }: PayloadAction<NoteEntity['id']>) => {
      state.notesList[id].star = !state.notesList[id].star;
    },

    /**
     * deleteElement
     *
     * @param state
     * @param id
     */
    deleteElement: (state, { payload: id }: PayloadAction<NoteEntity['id']>) => {
      delete state.notesList[id];
    },

    /**
     * updateFilters
     *
     * @param state
     * @param action
     */
    updateFilters: (state, action: PayloadAction<Partial<ListingFilters>>) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },

    /**
     * setEditElementMode
     *
     * @param state
     * @param id
     */
    setEditElementMode: (state, { payload: id }: PayloadAction<Nullable<NoteEntity['id']>>) => {
      state.editedElementId = id;
    },
  },
});

export const { actions: notesSliceActions, reducer: notesSliceReducer } = notesSlice;
