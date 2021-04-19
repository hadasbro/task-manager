import { call, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { createActionSagaWatchEvery } from '../../../utils/saga/helpers';
import { remindersSliceActions } from '../../../redux/slices/remindersSlice';
import { ListingElementData } from '../../../../components/organisms/ListingElementForm/ListingElementForm';
import { apploggerError, apploggerUserAlertSuccess } from '../../sagaChannels/generic/alert/helpers';

/**
 * saveReminderSaga
 */
const saveReminderSaga = createActionSagaWatchEvery({
  *saveReminderSaga({ payload: reminderFormData }: PayloadAction<ListingElementData>) {
    try {
      if (reminderFormData.entityId) {
        yield put(remindersSliceActions.updateReminder(reminderFormData));
        yield call(apploggerUserAlertSuccess, 'Reminder edited successfully');
      } else {
        yield put(remindersSliceActions.addNewReminder(reminderFormData));
        yield call(apploggerUserAlertSuccess, 'Added new reminder');
      }
    } catch (e) {
      yield call(apploggerError, e);
    }
  },
});

export const {
  action: saveReminderSagaAction,
  watcher: saveReminderSagaWatcher,
  effect: saveReminderSagaEffect,
} = saveReminderSaga;
