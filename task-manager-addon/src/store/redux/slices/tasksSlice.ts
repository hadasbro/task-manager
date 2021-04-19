/* eslint-disable no-param-reassign */
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'store/utils/toolkit/helpers';
import { TaskCommentToAdd, TaskStatus } from '../../../models/types';
import TaskEntity from '../../../models/entities/Task';
import { TasksState } from '../state/TasksState';
import { Nullable } from '../../../types/templates/Nullable';
import { EntityID } from '../../../types/interfaces/global/EntityID';
import { Dict } from '../../../types/templates/Dict';

/**
 * tasksSliceInitialState
 */
export const tasksSliceInitialState: TasksState = {
  tasksList: {},
  currentTask: null,
};

/**
 * tasksSlice
 */
const tasksSlice = createSlice({
  name: 'tasksSlice',
  initialState: tasksSliceInitialState,
  reducers: {
    /**
     * List of tasksTitle
     *
     * @param state
     * @param action
     */
    tasksListLoad: (state, { payload: tasksList }: PayloadAction<Dict<TaskEntity>>) => {
      state.tasksList = tasksList;
    },

    /**
     * currentTaskLoad
     *
     * @param state
     * @param payload
     */
    currentTaskLoad: (state, { payload: currentTask }: PayloadAction<Nullable<TaskEntity>>) => {
      state.currentTask = currentTask;
    },

    /**
     * changeStatus
     *
     * @param state
     * @param payload
     */
    changeStatus: (state, { payload }: PayloadAction<TaskStatus>) => {
      const status = payload;
    },

    /**
     * addTask
     *
     * @param state
     * @param payload
     */
    addTask: (state, { payload }: PayloadAction<TaskEntity>) => {
      const task = payload;
    },

    /**
     * addComment
     *
     * @param state
     * @param payload
     */
    addComment: (state, { payload }: PayloadAction<TaskCommentToAdd>) => {
      const comment = payload;
    },

    /**
     * fetchTimeReport
     *
     * @param state
     * @param action
     */
    fetchTimeReport: (state, action: PayloadAction<EntityID>) => {
      const taskId = action.payload;
    },

    /**
     * loadMetasAndTasks
     *
     * @param state
     */
    loadMetasAndTasks(state) {},
  },
});

export const { actions: tasksSliceActions, reducer: tasksSliceReducer } = tasksSlice;
