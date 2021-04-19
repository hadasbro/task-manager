import { call, put, select } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { userDataSliceActions } from 'store/redux/slices/userDataSlice';
import { timerSliceActions } from 'store/redux/slices/timerSlice';
import { DI } from '../../../../index';
import { TaskRepository } from '../../../../api/repositories/taskRepository';
import { EntityID } from '../../../../types/interfaces/global/EntityID';
import { TaskActivityStatus } from '../../../../init/enums/settings/TaskActivityStatus';
import { UserData } from '../../../../types/interfaces/objects/UserData';
import { selectUserData } from '../../../selectors/userDataSelectors';
import { TimerActions } from '../../../../init/enums/settings/TimerActions';
import { createActionSagaWatchEvery } from '../../../utils/saga/helpers';
import { apploggerError } from '../../sagaChannels/generic/alert/helpers';

type StartStopTimerPayload = { taskId: EntityID; taskAction: TimerActions };

/**
 * nullifyUserFilter
 */
const startStopTimerSaga = createActionSagaWatchEvery({
  *startStopTimerSaga({ payload: { taskId, taskAction } }: PayloadAction<StartStopTimerPayload>) {
    try {
      const taskRepo = DI.resolve(TaskRepository);

      const selectUserDataStore: UserData = yield select(selectUserData);

      const activeTask = selectUserDataStore.lastActiveTask;

      if (activeTask && activeTask.task.id !== taskId) {
        // stop currently running task if nt h sm as the current one
        yield put(userDataSliceActions.updateLastActiveTask(null));
      }

      if (taskAction === TimerActions.STOP && activeTask && activeTask.task.id === taskId) {
        // stop currently running task
        yield put(timerSliceActions.stopTimerOnTask(taskId));

        yield put(userDataSliceActions.updateLastActiveTask({ ...activeTask, status: TaskActivityStatus.INACTIVE }));
      } else if (taskAction === TimerActions.PLAY && (!activeTask || activeTask.task.id !== taskId)) {
        // start new task
        yield put(timerSliceActions.stopTimerOnCurentlyRunningTask());

        const single = yield call([taskRepo, taskRepo.getOneById], taskId);

        yield put(userDataSliceActions.updateLastActiveTask({ task: single, status: TaskActivityStatus.RUNNING }));
      }
    } catch (e) {
      yield call(apploggerError, e);
    }
  },
});

export const {
  action: startStopTimerSagaAction,
  watcher: startStopTimerSagaWatcher,
  effect: startStopTimerSagaEffect,
} = startStopTimerSaga;
