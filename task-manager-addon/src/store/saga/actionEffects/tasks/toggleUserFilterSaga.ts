import { put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { filterOrderSliceActions, ToggleFilterPayload } from 'store/redux/slices/filterOrderSlice';
import { createActionSagaWatchEvery } from '../../../utils/saga/helpers';
import { tasksListLoadSagaAction } from './tasksListLoadSaga';

/**
 * tasksListLoadSaga
 */
const toggleUserFilterSaga = createActionSagaWatchEvery({
  *toggleUserFilterSaga({ payload }: PayloadAction<ToggleFilterPayload>) {
    yield put(filterOrderSliceActions.toggleUserFilter(payload));
    yield put(tasksListLoadSagaAction());
  },
});

export const {
  action: toggleUserFilterSagaAction,
  watcher: toggleUserFilterSagaWatcher,
  effect: toggleUserFilterSagaEffect,
} = toggleUserFilterSaga;
