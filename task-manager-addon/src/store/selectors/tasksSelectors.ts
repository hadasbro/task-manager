import { createSelector } from '@reduxjs/toolkit';
import { selectMetaData } from './metaDataSelectors';
import { TaskEntityRelations } from '../../models/entities/Task';
import { tasksSliceInitialState } from '../redux/slices/tasksSlice';
import GeneralException from '../../exceptions/system/GeneralException';
import { AppState } from '../redux/AppState';
import { TasksState } from '../redux/state/TasksState';

/**
 * tasksSelector
 *
 * @param state
 */
const tasksSelector = (state: AppState): TasksState => state.tasksSlice || tasksSliceInitialState;

/**
 * Tasks / lists selector
 * (raw tasksTitle without relations [project, type, status, etc.])
 */
export const selectTasksDict = createSelector(tasksSelector, ts => ts.tasksList);

/**
 * selectTasks
 */
export const selectTasks = createSelector(tasksSelector, ts => Object.values(ts.tasksList));

/**
 * selectTasks
 */
export const selectTasksWithRelations = createSelector([selectMetaData, tasksSelector], (meta, tasks) => {
  return Object.values(tasks.tasksList).map(task => {
    if (!(task.projectId in meta.projects)) {
      throw new GeneralException(`Unknown projectId ${task.projectId} in Metas`);
    }

    if (!(task.typeId in meta.types)) {
      throw new GeneralException(`Unknown typeId ${task.typeId} in Metas`);
    }

    if (!(task.statusId in meta.statuses)) {
      throw new GeneralException(`Unknown typeId ${task.statusId} in Metas`);
    }

    if (!(task.priorityId in meta.priorities)) {
      throw new GeneralException(`Unknown typeId ${task.priorityId} in Metas`);
    }

    return {
      ...task,
      project: meta.projects[task.projectId],
      type: meta.types[task.typeId],
      status: meta.statuses[task.statusId],
      priority: meta.priorities[task.priorityId],
    } as TaskEntityRelations;
  });
});

/**
 * selectTasksCount
 */
export const selectTasksCount = createSelector(tasksSelector, ts => {
  return Object.keys(ts.tasksList).length;
});
