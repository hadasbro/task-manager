import { call, put } from 'redux-saga/effects';
import { metaDataSliceActions } from 'store/redux/slices/metaDataSlice';
import { loadingSliceActions } from 'store/redux/general/loadingStateSlice';
import { DI } from '../../../../index';
import { StatusRepository } from '../../../../api/repositories/statusRepository';

/**
 * loadAllStatusesSaga
 */
export function* loadAllStatusesSaga() {
  try {
    yield put(
      loadingSliceActions.setlStateMeta({
        statusesLoading: true,
        statusesError: null,
      }),
    );

    const statusRepo = DI.resolve(StatusRepository);

    const allEntities = yield call([statusRepo, statusRepo.getAll]);

    yield put(metaDataSliceActions.statusesLoad(allEntities));
  } catch (e) {
    yield put(
      loadingSliceActions.setlStateMeta({
        statusesLoading: false,
      }),
    );
  }
}
