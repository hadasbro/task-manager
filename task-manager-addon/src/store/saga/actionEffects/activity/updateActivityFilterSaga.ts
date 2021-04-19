import { put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { activitySliceActions } from '../../../redux/slices/activitySlice';
import { createActionSagaWatchDebounce } from '../../../utils/saga/helpers';
import { WorklogFilter } from '../../../../types/interfaces/objects/WorklogFilter';
import { loadActivityListSagaAction } from './loadActivityListSaga';

/**
 * activityListFilterUpdateSaga
 */
const updateActivityFilterSaga = createActionSagaWatchDebounce({
  *updateActivityFilterSaga({ payload: filter }: PayloadAction<WorklogFilter>) {
    yield put(activitySliceActions.activityFilterUpdate(filter));
    yield put(loadActivityListSagaAction());
  },
});

export const {
  action: updateActivityFilterSagaAction,
  watcher: updateActivityFilterSagaWatcher,
  effect: updateActivityFilterSagaEffect,
} = updateActivityFilterSaga;
