import { put } from 'redux-saga/effects';
import { peopleSliceActions } from 'store/redux/slices/peopleSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { createActionSagaWatchDebounce } from '../../../utils/saga/helpers';
import PeopleFilter from '../../../../types/interfaces/objects/PeopleFilter';
import { loadPeopleSagaAction } from './loadPeopleSaga';

/**
 * PeopleListFilterUpdateSaga
 */
const updatePeopleFilterSaga = createActionSagaWatchDebounce({
  *updatePeopleFilterSaga({ payload: filter }: PayloadAction<PeopleFilter>) {
    yield put(peopleSliceActions.peopleFilterUpdate(filter));
    yield put(loadPeopleSagaAction());
  },
});

export const {
  action: updatePeopleFilterSagaAction,
  watcher: updatePeopleFilterSagaWatcher,
  effect: updatePeopleFilterSagaEffect,
} = updatePeopleFilterSaga;
