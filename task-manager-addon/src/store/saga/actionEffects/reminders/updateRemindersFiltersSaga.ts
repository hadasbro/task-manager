import { put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { ListingFilters } from '../../../../components/templates/ListingProvider/ListingProvider';
import { createActionSagaWatchDebounce } from '../../../utils/saga/helpers';
import { remindersSliceActions } from '../../../redux/slices/remindersSlice';

/**
 * updateRemindersFiltersSaga
 */
const updateRemindersFiltersSaga = createActionSagaWatchDebounce({
  *updateRemindersFiltersSaga({ payload }: PayloadAction<Partial<ListingFilters>>) {
    yield put(remindersSliceActions.updateFilters(payload));
  },
});

export const {
  action: updateRemindersFiltersSagaAction,
  watcher: updateRemindersFiltersSagaWatcher,
  effect: updateRemindersFiltersSagaEffect,
} = updateRemindersFiltersSaga;
