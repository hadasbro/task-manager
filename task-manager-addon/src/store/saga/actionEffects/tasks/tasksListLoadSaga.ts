import { call, put, select, delay } from 'redux-saga/effects';
import { Dict } from 'types/templates/Dict';
import TaskEntity from 'models/entities/Task';
import { tasksSliceActions } from 'store/redux/slices/tasksSlice';
import { loadingSliceActions } from 'store/redux/general/loadingStateSlice';
import { DI } from '../../../../index';
import { TaskRepository } from '../../../../api/repositories/taskRepository';
import FilterOrder from '../../../../types/interfaces/objects/FilterOrder';
import { selectFiltersOrder } from '../../../selectors/filterOrderSelectors';
import { createActionSagaWatchLatest } from '../../../utils/saga/helpers';
import { storeExceptionFromAny } from '../../../../exceptions/store/StoreException';
import { apploggerError } from '../../sagaChannels/generic/alert/helpers';

/**
 * tasksListLoadSaga
 */
const tasksListLoadSaga = createActionSagaWatchLatest({
  *tasksListLoadSaga() {
    try {
      yield put(loadingSliceActions.setlStateTasks({ tasksListLoading: true, tasksListError: null }));

      yield delay(600);

      const taskRepo = DI.resolve(TaskRepository);

      const filterOrder: FilterOrder = yield select(selectFiltersOrder);

      const allTasks: Dict<TaskEntity> = yield call([taskRepo, taskRepo.getFiltered], filterOrder);

      yield put(tasksSliceActions.tasksListLoad(allTasks));
    } catch (e) {
      yield call(apploggerError, e);
    } finally {
      yield put(loadingSliceActions.setlStateTasks({ tasksListLoading: false }));
    }
  },
});

export const {
  action: tasksListLoadSagaAction,
  watcher: tasksListLoadSagaWatcher,
  effect: tasksListLoadSagaEffect,
} = tasksListLoadSaga;
