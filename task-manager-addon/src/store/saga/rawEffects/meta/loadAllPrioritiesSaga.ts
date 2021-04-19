import { call, put } from 'redux-saga/effects';
import { metaDataSliceActions } from 'store/redux/slices/metaDataSlice';
import { loadingSliceActions } from 'store/redux/general/loadingStateSlice';
import { DI } from '../../../../index';
import { PriorityRepository } from '../../../../api/repositories/priorityRepository';
import { apploggerError } from '../../sagaChannels/generic/alert/helpers';

/**
 * loadAllPrioritiesSaga
 */
export function* loadAllPrioritiesSaga() {
  try {
    const priorityRepo = DI.resolve(PriorityRepository);

    const allEntities = yield call([priorityRepo, priorityRepo.getAll]);

    yield put(metaDataSliceActions.prioritiesLoad(allEntities));
  } catch (e) {
    yield call(apploggerError, e);
  } finally {
    yield put(loadingSliceActions.setlStateMeta({ prioritiesLoading: false }));
  }
}
