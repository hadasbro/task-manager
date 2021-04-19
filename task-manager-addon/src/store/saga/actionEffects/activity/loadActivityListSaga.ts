import { call, delay, put, select } from 'redux-saga/effects';
import { loadingSliceActions } from '../../../redux/general/loadingStateSlice';
import { ActivityFilter } from '../../../../types/interfaces/objects/ActivityFilter';
import { selectActivityFilter } from '../../../selectors/activitySelectors';
import { DI } from '../../../../index';
import { ActivityRepository } from '../../../../api/repositories/activityRepository';
import { activitySliceActions } from '../../../redux/slices/activitySlice';
import { createActionSagaWatchLatest } from '../../../utils/saga/helpers';
import { isNotEmpty } from '../../../../types/guards/general/isNotEmpty';
import { apploggerError } from '../../sagaChannels/generic/alert/helpers';

/**
 * loadActivityListSaga
 */
const loadActivityListSaga = createActionSagaWatchLatest({
  *loadActivityListSaga() {
    try {
      yield put(loadingSliceActions.setlStateActivity({ activityListLoading: true, activityListError: null }));

      yield delay(600);

      const filter: ActivityFilter = yield select(selectActivityFilter);

      const aUserId = isNotEmpty(filter.user) ? filter.user.accountId : null;

      const aPage = isNotEmpty(filter.page) ? filter.page : 1;

      const activityRepository = DI.resolve(ActivityRepository);

      const activityList = yield call([activityRepository, activityRepository.getFiltered], aUserId, aPage);

      yield put(activitySliceActions.activityListLoad(activityList));
    } catch (e) {
      yield call(apploggerError, e);
    } finally {
      yield put(loadingSliceActions.setlStateActivity({ activityListLoading: false }));
    }
  },
});

export const {
  action: loadActivityListSagaAction,
  watcher: loadActivityListSagaWatcher,
  effect: loadActivityListSagaEffect,
} = loadActivityListSaga;
