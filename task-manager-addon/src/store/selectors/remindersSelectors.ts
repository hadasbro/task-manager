import { createSelector } from '@reduxjs/toolkit';
import { ListingFilters } from '../../types/interfaces/components/listings/filters';
import { remindersSliceInitialState } from '../redux/slices/remindersSlice';
import { pipe } from '../../utils/transformPipe/pipe';
import { AppState } from '../redux/AppState';
import { RemindersState } from '../redux/state/RemindersState';
import { dayjsFormat, dayjsObj } from '../../extensions/dayjs';
import { Nullable } from '../../types/templates/Nullable';
import TodoEntity from '../../models/entities/Todo';
import { ListingElementData } from '../../components/organisms/ListingElementForm/ListingElementForm';

/**
 * filterNotes
 *
 * Configured filter function used to filter Notes
 */
const filterReminders = pipe();

/**
 * tasksSelector
 *
 * @param state
 */
const reminderSelector = (state: AppState): RemindersState => state.remindersSlice || remindersSliceInitialState;

/**
 * filterSelector
 *
 * @param state
 */
const remindersFilterSelector = (state: AppState): ListingFilters =>
  state.remindersSlice.filters || remindersSliceInitialState.filters;

/**
 * selectTodoFilters
 */
export const selectRemindersFilters = createSelector(remindersFilterSelector, ts => ts);

/**
 * selectAllReminders
 */
export const selectAllReminders = createSelector(reminderSelector, ts => ts.remindersList);

/**
 * selectTodaysReminders
 */
export const selectTodaysReminders = createSelector(selectAllReminders, todos => {
  return Object.values(todos)
    .filter(td => td.pinned !== null)
    .filter(td => {
      return dayjsFormat(dayjsObj(), 'YYYY-MM-DD') === dayjsFormat(td.pinned, 'YYYY-MM-DD');
    });
});

/**
 * selectRingingReminders
 */
export const selectRingingReminders = createSelector(selectAllReminders, todos => {
  return Object.values(todos).filter(td => td.ringing);
});

/**
 * selectTodayUndoneTodosCount
 */
export const selectTodaysRemindersCount = createSelector(selectTodaysReminders, rm => rm.length);

/**
 * selectFilteredReminders
 */
export const selectFilteredReminders = createSelector(
  [selectAllReminders, selectRemindersFilters],
  (reminders, filters) => {
    const allElements = Object.values(reminders);
    return filterReminders(allElements, filters).reduce((acc, el) => {
      return { ...acc, [el.id]: el };
    }, {});
  },
);

/**
 * selectFilteredRemindersCount
 */
export const selectFilteredRemindersCount = createSelector(selectFilteredReminders, rem => {
  return Object.keys(rem).length;
});
