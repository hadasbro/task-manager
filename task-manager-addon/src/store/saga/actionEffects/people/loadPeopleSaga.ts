import { call, delay, put, select } from 'redux-saga/effects';
import { selectPeopleFilter } from 'store/selectors/peopleSelectors';
import { peopleSliceActions } from '../../../redux/slices/peopleSlice';
import { DI } from '../../../../index';
import { UserRepository } from '../../../../api/repositories/userRepository';
import PeopleFilter from '../../../../types/interfaces/objects/PeopleFilter';
import { loadingSliceActions } from '../../../redux/general/loadingStateSlice';
import { createActionSagaWatchLatest } from '../../../utils/saga/helpers';
import { storeExceptionFromAny } from '../../../../exceptions/store/StoreException';
import { apploggerError } from '../../sagaChannels/generic/alert/helpers';

/**
 * saveReminderSaga
 */
const loadPeopleSaga = createActionSagaWatchLatest({
  *loadPeopleSaga() {
    try {
      yield put(loadingSliceActions.setlStatePeople({ peopleLoading: true, peopleError: null }));

      const userRepository = DI.resolve(UserRepository);

      yield delay(600);

      const filter: PeopleFilter = yield select(selectPeopleFilter);

      const users = yield call([userRepository, userRepository.getFiltered], filter);

      yield put(peopleSliceActions.peopleLoad(users));
    } catch (e) {
      yield call(apploggerError, e);
    } finally {
      yield put(loadingSliceActions.setlStatePeople({ peopleLoading: false }));
    }
  },
});

export const {
  action: loadPeopleSagaAction,
  watcher: loadPeopleSagaWatcher,
  effect: loadPeopleSagaEffect,
} = loadPeopleSaga;
