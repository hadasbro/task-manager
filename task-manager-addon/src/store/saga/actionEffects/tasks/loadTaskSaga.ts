import { call, put, delay } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { tasksSliceActions } from 'store/redux/slices/tasksSlice';
import { loadingSliceActions } from 'store/redux/general/loadingStateSlice';
import { storeExceptionFromAny } from 'exceptions/store/StoreException';
import { DI } from '../../../../index';
import { TaskRepository } from '../../../../api/repositories/taskRepository';
import { EntityID } from '../../../../types/interfaces/global/EntityID';
import { createActionSagaWatchLatest } from '../../../utils/saga/helpers';
import { apploggerError } from '../../sagaChannels/generic/alert/helpers';

/**
 * nullifyUserFilter
 */
const loadTaskSaga = createActionSagaWatchLatest({
  *loadTaskSaga({ payload: entityId }: PayloadAction<EntityID>) {
    try {
      yield put(loadingSliceActions.setlStateTasks({ currentTaskLoading: true, currentTaskError: null }));

      yield delay(1000);

      const taskRepo = DI.resolve(TaskRepository);

      const single = yield call([taskRepo, taskRepo.getOneById], entityId);

      yield put(tasksSliceActions.currentTaskLoad(single));
    } catch (e) {
      yield call(apploggerError, e);
    } finally {
      yield put(loadingSliceActions.setlStateTasks({ currentTaskLoading: false }));
    }
  },
});

export const { action: loadTaskSagaAction, watcher: loadTaskSagaWatcher, effect: loadTaskSagaEffect } = loadTaskSaga;
