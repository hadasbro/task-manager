/* eslint-disable no-param-reassign */
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'store/utils/toolkit/helpers';
import ReminderEntity from '../../../models/entities/Reminder';
import { dayjsObj } from '../../../extensions/dayjs';
import { ListingFilters } from '../../../types/interfaces/components/listings/filters';
import { ListingElementData } from '../../../components/organisms/ListingElementForm/ListingElementForm';
import { RemindersState } from '../state/RemindersState';
import { createKey } from '../../../functions/general/createKey';
import { defaultRemindersList } from '../../../init/defaults/reminders';
import { defaultListingFilters } from '../../../init/defaults/listings';
import { validateReminder } from '../../../functions/validators/validateReminder';

/**
 * remindersSliceInitialState
 */
export const remindersSliceInitialState: RemindersState = {
  remindersList: defaultRemindersList,
  filters: defaultListingFilters,
};

/**
 * remindersSlice
 */
const remindersSlice = createSlice({
  name: 'remindersSlice',
  initialState: remindersSliceInitialState,
  reducers: {
    /**
     * addNewReminder
     *
     * @param state
     * @param data
     */
    addNewReminder: (state, { payload: data }: PayloadAction<ListingElementData>) => {
      if (validateReminder(data)) {
        const newReminder: ReminderEntity = {
          id: createKey(),
          added: dayjsObj(),
          done: false,
          ringing: false,
          title: data.title,
          pinned: data.pinned,
        };

        state.remindersList = {
          ...state.remindersList,
          [newReminder.id]: newReminder,
        };
      }
    },

    /**
     * updateReminder
     *
     * @param state
     * @param data
     */
    updateReminder: (state, { payload: data }: PayloadAction<ListingElementData>) => {
      if (validateReminder(data, 'edit')) {
        state.remindersList[data.entityId!] = {
          ...state.remindersList[data.entityId!],
          title: data.title,
          pinned: data.pinned,
          done: data.done,
        };
      }
    },

    /**
     * toggleDone
     *
     * @param state
     * @param id
     */
    toggleDone: (state, { payload: id }: PayloadAction<ReminderEntity['id']>) => {
      state.remindersList[id].done = !state.remindersList[id].done;
      state.remindersList[id].ringing = !state.remindersList[id].ringing;
    },

    /**
     * deleteElement
     *
     * @param state
     * @param id
     */
    deleteElement: (state, { payload: id }: PayloadAction<ReminderEntity['id']>) => {
      delete state.remindersList[id];
    },

    /**
     * updateFilters
     *
     * @param state
     * @param action
     */
    updateFilters: (state, { payload: newFilters }: PayloadAction<Partial<ListingFilters>>) => {
      state.filters = {
        ...state.filters,
        ...newFilters,
      };
    },

    /**
     * ringReminders
     *
     * @param state
     * @param ids
     */
    ringReminders: (state, { payload: ids }: PayloadAction<ReminderEntity['id'][]>) => {
      ids.forEach(id => {
        if (state.remindersList[id]) {
          state.remindersList[id].ringing = true;
        }
      });
    },
  },
});

export const { actions: remindersSliceActions, reducer: remindersSliceReducer } = remindersSlice;
