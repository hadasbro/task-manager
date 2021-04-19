import { call } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { createActionSagaWatchEvery } from '../../../utils/saga/helpers';
import { StoreException } from '../../../../exceptions/store/StoreException';
import { apploggerError } from '../../sagaChannels/generic/alert/helpers';

/**
 * loadActivityListSaga
 */
const triggerAppErrorSaga = createActionSagaWatchEvery({
  *triggerAppErrorSaga({ payload: exception }: PayloadAction<StoreException>) {
    yield call(apploggerError, exception);
  },
});

export const {
  action: triggerAppErrorSagaAction,
  watcher: triggerAppErrorSagaWatcher,
  effect: triggerAppErrorSagaEffect,
} = triggerAppErrorSaga;
