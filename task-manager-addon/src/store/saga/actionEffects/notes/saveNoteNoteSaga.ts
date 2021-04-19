import { notesSliceActions } from 'store/redux/slices/notesSlice';
import { put, call } from 'redux-saga/effects';
import { apploggerError, apploggerUserAlertSuccess } from 'store/saga/sagaChannels/generic/alert/helpers';
import { PayloadAction } from '@reduxjs/toolkit';
import { createActionSagaWatchEvery } from '../../../utils/saga/helpers';
import { ListingElementData } from '../../../../components/organisms/ListingElementForm/ListingElementForm';

/**
 * saveNoteNoteSaga
 */
const saveNoteNoteSaga = createActionSagaWatchEvery({
  *saveNoteNoteSaga({ payload: noteFormData }: PayloadAction<ListingElementData>) {
    try {
      if (noteFormData.entityId) {
        yield put(notesSliceActions.updateNote(noteFormData));
        yield call(apploggerUserAlertSuccess, 'Note edited successfully');
      } else {
        yield put(notesSliceActions.addNewNote(noteFormData));
        yield call(apploggerUserAlertSuccess, 'Note new reminder');
      }
    } catch (e) {
      yield call(apploggerError, e);
    }
  },
});

export const {
  action: saveNoteSagaAction,
  watcher: saveNoteSagaWatcher,
  effect: saveNoteSagaEffect,
} = saveNoteNoteSaga;
