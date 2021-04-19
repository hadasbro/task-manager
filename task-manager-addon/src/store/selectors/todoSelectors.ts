import { createSelector } from '@reduxjs/toolkit';
import { todosSliceInitialState } from '../redux/slices/todoSlice';
import TodoEntity from '../../models/entities/Todo';
import { ListingFilters } from '../../types/interfaces/components/listings/filters';
import { pipe } from '../../utils/transformPipe/pipe';
import { Dict } from '../../types/templates/Dict';
import { AppState } from '../redux/AppState';
import { dayjsFormat, dayjsObj } from '../../extensions/dayjs';
import { Nullable } from '../../types/templates/Nullable';
import { ListingElementData } from '../../components/organisms/ListingElementForm/ListingElementForm';
import { EntityID } from '../../types/interfaces/global/EntityID';
import { ListingElement } from '../../types/interfaces/listings/ListingElement';
import { elementHasStar } from '../../types/guards/todo/elementHasStar';
import { elementHasDescription } from '../../types/guards/todo/elementHasDescription';
import { elementIsPinned } from '../../types/guards/todo/elementIsPinned';
import { elementHasTags } from '../../types/guards/todo/elementHasTags';

/**
 * filterTodos
 *
 * Configured filter function used to filter Todos
 */
const filterTodos = pipe();

/**
 * tasksSelector
 *
 * @param state
 */
const todoSelector = (state: AppState): Dict<TodoEntity> => state.todoSlice.todoList || todosSliceInitialState.todoList;

/**
 * filterSelector
 *
 * @param state
 */
const filterSelector = (state: AppState): ListingFilters => state.todoSlice.filters || todosSliceInitialState.filters;

/**
 * selectTodoFilters
 */
export const selectTodoFilters = createSelector(filterSelector, ts => ts);

/**
 * selectAllTodos
 */
export const selectAllTodos = createSelector(todoSelector, ts => ts);

/**
 * selectTodaysTodos
 */
export const selectTodaysTodos = createSelector(selectAllTodos, todos => {
  return Object.values(todos)
    .filter(td => td.pinned != null)
    .filter(td => {
      return dayjsFormat(dayjsObj(), 'YYYY-MM-DD') === dayjsFormat(td.pinned, 'YYYY-MM-DD');
    });
});

/**
 * selectTodayUndoneTodosCount
 */
export const selectTodayUndoneTodosCount = createSelector(selectTodaysTodos, tt => tt.filter(t => !t.done).length);

/**
 * selectFilteredTodos
 */
export const selectFilteredTodos = createSelector([todoSelector, filterSelector], (todos, filters) => {
  const allElements = Object.values(todos);
  return filterTodos(allElements, filters).reduce((acc, el) => {
    return { ...acc, [el.id]: el };
  }, {});
});

/**
 * selectFilteredTodosCount
 */
export const selectFilteredTodosCount = createSelector(selectFilteredTodos, todos => {
  return Object.keys(todos).length;
});
