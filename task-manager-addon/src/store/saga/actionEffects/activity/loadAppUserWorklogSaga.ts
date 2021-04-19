import { call, put, select, take, race } from 'redux-saga/effects';
import { DI } from '../../../../index';
import { ActivityRepository } from '../../../../api/repositories/activityRepository';
import { activitySliceActions } from '../../../redux/slices/activitySlice';
import { createActionSagaWatchLatest } from '../../../utils/saga/helpers';
import { apploggerError } from '../../sagaChannels/generic/alert/helpers';
import { selectConfigUser } from '../../../selectors/apiConfigSelectors';
import { Nullable } from '../../../../types/templates/Nullable';
import UserEntity from '../../../../models/entities/User';
import { loadAppUserSaga } from '../../rawEffects/meta/loadAppUserSaga';
import { WorklogRepository } from '../../../../api/repositories/worklogRepository';

/**
 * loadAppUserWorklogSaga
 */
const loadAppUserWorklogSaga = createActionSagaWatchLatest({
  *loadAppUserWorklogSaga() {
    try {
      yield call(loadAppUserSaga);

      const user: Nullable<UserEntity> = yield select(selectConfigUser);

      if (!user) {
        throw new Error('Missing app user');
      }

      const worklogRepository = DI.resolve(WorklogRepository);

      const activityList = yield call([worklogRepository, worklogRepository.getFiltered], user.accountId);

      yield put(activitySliceActions.loadAppUserWorklog(activityList));
    } catch (e) {
      yield call(apploggerError, e);
    }
  },
});

export const {
  action: loadAppUserWorklogSagaAction,
  watcher: loadAppUserWorklogSagaWatcher,
  effect: loadAppUserWorklogSagaEffect,
} = loadAppUserWorklogSaga;
