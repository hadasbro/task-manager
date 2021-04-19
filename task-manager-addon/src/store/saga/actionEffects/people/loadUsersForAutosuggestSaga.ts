import { call, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { peopleSliceActions } from '../../../redux/slices/peopleSlice';
import { DI } from '../../../../index';
import { UserRepository } from '../../../../api/repositories/userRepository';
import { Nullable } from '../../../../types/templates/Nullable';
import { createActionSagaWatchDebounce } from '../../../utils/saga/helpers';
import { apploggerError } from '../../sagaChannels/generic/alert/helpers';

/**
 * saveReminderSaga
 */
const loadUsersForAutosuggestSaga = createActionSagaWatchDebounce({
  *loadUsersForAutosuggestSaga({ payload: userName }: PayloadAction<Nullable<string>>) {
    try {
      const userRepository = DI.resolve(UserRepository);
      const users = yield call([userRepository, userRepository.getFiltered], { userName });
      yield put(peopleSliceActions.loadUsersForAutosuggest(Object.values(users)));
    } catch (e) {
      yield call(apploggerError, e);
    }
  },
});

export const {
  action: loadUsersForAutosuggestSagaAction,
  watcher: loadUsersForAutosuggestSagaWatcher,
  effect: loadUsersForAutosuggestSagaEffect,
} = loadUsersForAutosuggestSaga;
