import { notesSliceActions } from 'store/redux/slices/notesSlice';
import { put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { ListingFilters } from '../../../../components/templates/ListingProvider/ListingProvider';
import { createActionSagaWatchDebounce } from '../../../utils/saga/helpers';

/**
 * updateNotesFiltersSaga
 */
const updateNotesFiltersSaga = createActionSagaWatchDebounce({
  *updateNotesFiltersSaga({ payload }: PayloadAction<Partial<ListingFilters>>) {
    yield put(notesSliceActions.updateFilters(payload));
  },
});

export const {
  action: updateNotesFiltersSagaAction,
  watcher: updateNotesFiltersSagaWatcher,
  effect: updateNotesFiltersSagaEffect,
} = updateNotesFiltersSaga;
