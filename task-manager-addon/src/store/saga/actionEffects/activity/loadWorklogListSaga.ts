import { call, delay, put, select } from 'redux-saga/effects';
import { activitySliceActions } from 'store/redux/slices/activitySlice';
import { selectWorklogFilter } from 'store/selectors/activitySelectors';
import { DI } from '../../../../index';
import { WorklogRepository } from '../../../../api/repositories/worklogRepository';
import { WorklogFilter } from '../../../../types/interfaces/objects/WorklogFilter';
import { loadingSliceActions } from '../../../redux/general/loadingStateSlice';
import { createActionSagaWatchLatest } from '../../../utils/saga/helpers';
import { storeExceptionFromAny } from '../../../../exceptions/store/StoreException';
import { isNotEmpty } from '../../../../types/guards/general/isNotEmpty';
import { apploggerError } from '../../sagaChannels/generic/alert/helpers';

/**
 * loadWorklogListSaga
 */
const loadWorklogListSaga = createActionSagaWatchLatest({
  *loadWorklogListSaga() {
    try {
      yield put(loadingSliceActions.setlStateActivity({ worklogListLoading: true, worklogListError: null }));

      yield delay(600);

      const filter: WorklogFilter = yield select(selectWorklogFilter);

      const aUserId = isNotEmpty(filter.user) ? filter.user.accountId : null;
      const aDate = isNotEmpty(filter.date) ? filter.date : null;
      const aPage = isNotEmpty(filter.page) ? filter.page : 1;

      const worklogRepository = DI.resolve(WorklogRepository);

      const worklog = yield call([worklogRepository, worklogRepository.getFiltered], aUserId, aDate, aPage);

      yield put(activitySliceActions.worklogListLoad(worklog));
    } catch (e) {
      yield call(apploggerError, e);
    } finally {
      yield put(loadingSliceActions.setlStateActivity({ worklogListLoading: false }));
    }
  },
});

export const {
  action: loadWorklogListSagaAction,
  watcher: loadWorklogListSagaWatcher,
  effect: loadWorklogListSagaEffect,
} = loadWorklogListSaga;
