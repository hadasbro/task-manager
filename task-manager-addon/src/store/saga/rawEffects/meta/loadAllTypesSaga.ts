import { call, put } from 'redux-saga/effects';
import { metaDataSliceActions } from 'store/redux/slices/metaDataSlice';
import { loadingSliceActions } from 'store/redux/general/loadingStateSlice';
import { DI } from '../../../../index';
import { TypeRepository } from '../../../../api/repositories/typeRepository';
import { apploggerError } from '../../sagaChannels/generic/alert/helpers';

/**
 * loadAllTypesSaga
 */
export function* loadAllTypesSaga() {
  try {
    yield put(loadingSliceActions.setlStateMeta({ typesLoading: true, typesError: null }));

    const typeRepo = DI.resolve(TypeRepository);

    const allEntities = yield call([typeRepo, typeRepo.getAll]);

    yield put(metaDataSliceActions.typesLoad(allEntities));
  } catch (e) {
    yield call(apploggerError, e);
  } finally {
    yield put(loadingSliceActions.setlStateMeta({ typesLoading: false }));
  }
}
