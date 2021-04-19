import { call, take, cancelled, all, select, put } from 'redux-saga/effects';
import dayjs from 'dayjs';
import { remindersSliceActions } from 'store/redux/slices/remindersSlice';
import { channel } from './channel';
import { selectAllReminders } from '../../../../selectors/remindersSelectors';
import { Dict } from '../../../../../types/templates/Dict';
import ReminderEntity from '../../../../../models/entities/Reminder';
import { dayjsExt } from '../../../../../extensions/dayjs';

/**
 * panelChangeHandleEffect
 *
 * things to do when we change panel
 */
export function* remindersCheckEffect(time: dayjs.Dayjs) {
  const reminders: Dict<ReminderEntity> = yield select(selectAllReminders);

  const ringinGReminders = Object.values(reminders)
    .filter(reminder => {
      if (reminder.done || reminder.ringing || reminder.pinned === null) {
        return false;
      }

      return time.diff(dayjsExt(reminder.pinned), 's') > 30;
    })
    .reduce((ac: string[], cr) => {
      ac.push(cr.id);
      return ac;
    }, []);

  if (ringinGReminders) {
    yield put(remindersSliceActions.ringReminders(ringinGReminders));
  }
}

/**
 * timerWatcher
 *
 * Events based on time (events required some schedule e.g. Reminders)
 */
export function* timerWatcher() {
  const chan = yield call(channel);
  try {
    while (true) {
      const time: dayjs.Dayjs = yield take(chan);
      yield all([call(remindersCheckEffect, time)]);
    }
  } finally {
    if (yield cancelled()) {
      chan.close();
    }
  }
}
