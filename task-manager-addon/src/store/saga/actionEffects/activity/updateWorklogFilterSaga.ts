import { put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { activitySliceActions } from '../../../redux/slices/activitySlice';
import { createActionSagaWatchDebounce } from '../../../utils/saga/helpers';
import { WorklogFilter } from '../../../../types/interfaces/objects/WorklogFilter';
import { loadWorklogListSagaAction } from './loadWorklogListSaga';

/**
 * updateWorklogFilterSaga
 */
const updateWorklogFilterSaga = createActionSagaWatchDebounce({
  *updateWorklogFilterSaga({ payload: filter }: PayloadAction<WorklogFilter>) {
    yield put(activitySliceActions.worklogFilterUpdate(filter));
    yield put(loadWorklogListSagaAction());
  },
});

export const {
  action: updateWorklogFilterSagaAction,
  watcher: updateWorklogFilterSagaWatcher,
  effect: updateWorklogFilterSagaEffect,
} = updateWorklogFilterSaga;
