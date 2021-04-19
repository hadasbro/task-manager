import { put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { ListingFilters } from '../../../../components/templates/ListingProvider/ListingProvider';
import { createActionSagaWatchDebounce } from '../../../utils/saga/helpers';
import { todosSliceActions } from '../../../redux/slices/todoSlice';

/**
 * updateTodoFiltersSaga
 */
const updateTodoFiltersSaga = createActionSagaWatchDebounce({
  *updateTodoFiltersSaga({ payload }: PayloadAction<Partial<ListingFilters>>) {
    yield put(todosSliceActions.updateFilters(payload));
  },
});

export const {
  action: updateTodoFiltersSagaAction,
  watcher: updateTodoFiltersSagaWatcher,
  effect: updateTodoFiltersSagaEffect,
} = updateTodoFiltersSaga;
