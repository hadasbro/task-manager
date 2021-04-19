import { put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { filterOrderSliceActions } from 'store/redux/slices/filterOrderSlice';
import FilterOrder from '../../../../types/interfaces/objects/FilterOrder';
import { createActionSagaWatchDebounce } from '../../../utils/saga/helpers';
import { tasksListLoadSagaAction } from './tasksListLoadSaga';

/**
 * tasksListLoadSaga
 */
const updateTasksFiltersSaga = createActionSagaWatchDebounce({
  *updateTasksFiltersSaga({ payload }: PayloadAction<Partial<FilterOrder>>) {
    yield put(filterOrderSliceActions.updateFilters(payload));
    yield put(tasksListLoadSagaAction());
  },
});

export const {
  action: updateTasksFiltersSagaAction,
  watcher: updateTasksFiltersSagaWatcher,
  effect: updateTasksFiltersSagaEffect,
} = updateTasksFiltersSaga;
