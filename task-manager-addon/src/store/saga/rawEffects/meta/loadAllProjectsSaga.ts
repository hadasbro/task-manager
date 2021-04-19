import { call, put } from 'redux-saga/effects';
import { metaDataSliceActions } from 'store/redux/slices/metaDataSlice';
import { loadingSliceActions } from 'store/redux/general/loadingStateSlice';
import { DI } from '../../../../index';
import { ProjectRepository } from '../../../../api/repositories/projectRepository';
import { apploggerError } from '../../sagaChannels/generic/alert/helpers';

/**
 * loadAllProjectsSaga
 */
export function* loadAllProjectsSaga() {
  try {
    yield put(loadingSliceActions.setlStateMeta({ projectsLoading: true, projectsError: null }));

    const projectsRepo = DI.resolve(ProjectRepository);

    const allEntities = yield call([projectsRepo, projectsRepo.getAll]);

    yield put(metaDataSliceActions.projectsLoad(allEntities));
  } catch (e) {
    yield call(apploggerError, e);
  } finally {
    yield put(loadingSliceActions.setlStateMeta({ projectsLoading: false }));
  }
}
