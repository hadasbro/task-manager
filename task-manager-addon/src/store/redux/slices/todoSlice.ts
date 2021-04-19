/* eslint-disable no-param-reassign */
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'store/utils/toolkit/helpers';
import TodoEntity from '../../../models/entities/Todo';
import { dayjsObj } from '../../../extensions/dayjs';
import { ListingFilters } from '../../../types/interfaces/components/listings/filters';
import { ListingElementData } from '../../../components/organisms/ListingElementForm/ListingElementForm';
import { TodoState } from '../state/TodoState';
import { createKey } from '../../../functions/general/createKey';
import { defaultTodoList } from '../../../init/defaults/todos';
import { defaultListingFilters } from '../../../init/defaults/listings';
import { validateTodo } from '../../../functions/validators/validateTodo';

/**
 * timerSliceInitialState
 */
export const todosSliceInitialState: TodoState = {
  todoList: defaultTodoList,
  filters: defaultListingFilters,
};

const todoSlice = createSlice({
  name: 'todoSlice',
  initialState: todosSliceInitialState,
  reducers: {
    /**
     * addNewTodo
     *
     * @param state
     * @param todoFormData
     */
    addNewTodo: (state, { payload: todoFormData }: PayloadAction<ListingElementData>) => {
      if (validateTodo(todoFormData)) {
        const newTodo: TodoEntity = {
          id: createKey(),
          added: dayjsObj(),
          description: todoFormData.description,
          title: todoFormData.title,
          pinned: todoFormData.pinned,
          tags: todoFormData.tags,
          star: todoFormData.star,
          done: todoFormData.done,
        };

        state.todoList = {
          ...state.todoList,
          [newTodo.id]: newTodo,
        };
      }
    },

    /**
     * editTodo
     *
     * @param state
     * @param todoFormData
     */
    editTodo: (state, { payload: todoFormData }: PayloadAction<ListingElementData>) => {
      if (validateTodo(todoFormData, 'edit')) {
        state.todoList[todoFormData.entityId!] = {
          ...state.todoList[todoFormData.entityId!],
          description: todoFormData.description,
          title: todoFormData.title,
          pinned: todoFormData.pinned,
          tags: todoFormData.tags,
          star: todoFormData.star,
          done: todoFormData.done,
        };
      }
    },

    /**
     * toggleDone
     *
     * @param state
     * @param id
     */
    toggleDone: (state, { payload: id }: PayloadAction<TodoEntity['id']>) => {
      state.todoList[id].done = !state.todoList[id].done;
    },

    /**
     * toggleStar
     *
     * @param state
     * @param id
     */
    toggleStar: (state, { payload: id }: PayloadAction<TodoEntity['id']>) => {
      state.todoList[id].star = !state.todoList[id].star;
    },

    /**
     * deleteElement
     *
     * @param state
     * @param id
     */
    deleteElement: (state, { payload: id }: PayloadAction<TodoEntity['id']>) => {
      delete state.todoList[id];
    },

    /**
     * updateFilters
     *
     * @param state
     * @param action
     */
    updateFilters: (state, { payload: filters }: PayloadAction<Partial<ListingFilters>>) => {
      state.filters = {
        ...state.filters,
        ...filters,
      };
    },
  },
});

export const { actions: todosSliceActions, reducer: todosSliceReducer } = todoSlice;
