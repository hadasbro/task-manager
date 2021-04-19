import { put } from 'redux-saga/effects';
import { filterOrderSliceActions } from 'store/redux/slices/filterOrderSlice';
import { createActionSagaWatchEvery } from '../../../utils/saga/helpers';
import { tasksListLoadSagaAction } from './tasksListLoadSaga';

/**
 * nullifyUserFilter
 */
const nullifyUserFilterSaga = createActionSagaWatchEvery({
  *nullifyUserFilterSaga() {
    yield put(filterOrderSliceActions.nullifyUserFilter());
    yield put(tasksListLoadSagaAction());
  },
});

export const {
  action: nullifyUserFilterSagaAction,
  watcher: nullifyUserFilterSagaWatcher,
  effect: nullifyUserFilterSagaEffect,
} = nullifyUserFilterSaga;
