import { put, all, call } from 'redux-saga/effects';
import { loadingSliceActions } from 'store/redux/general/loadingStateSlice';
import { createActionSagaWatch } from '../../../utils/saga/helpers';
import { loadAllProjectsSaga } from '../../rawEffects/meta/loadAllProjectsSaga';
import { loadAllPrioritiesSaga } from '../../rawEffects/meta/loadAllPrioritiesSaga';
import { loadAllStatusesSaga } from '../../rawEffects/meta/loadAllStatusesSaga';
import { loadAllTypesSaga } from '../../rawEffects/meta/loadAllTypesSaga';
import { apploggerError } from '../../sagaChannels/generic/alert/helpers';
import { loadAppUserSaga } from '../../rawEffects/meta/loadAppUserSaga';

/**
 * nullifyUserFilter
 */
const loadMetasSaga = createActionSagaWatch({
  *loadMetasSaga() {
    try {
      yield put(loadingSliceActions.setlStateMeta({ metaLoading: true, metaError: null }));
      yield all([
        loadAllTypesSaga(),
        loadAllProjectsSaga(),
        loadAllPrioritiesSaga(),
        loadAllStatusesSaga(),
        loadAppUserSaga(),
      ]);
    } catch (e) {
      yield call(apploggerError, e);
    } finally {
      yield put(loadingSliceActions.setlStateMeta({ metaLoading: false }));
    }
  },
});

export const {
  action: loadMetasSagaAction,
  watcher: loadMetasSagaWatcher,
  effect: loadMetasSagaEffect,
} = loadMetasSaga;
