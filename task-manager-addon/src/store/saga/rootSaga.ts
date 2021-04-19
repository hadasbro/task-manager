import { all, call, spawn } from 'redux-saga/effects';
import { tasksListLoadSagaWatcher } from './actionEffects/tasks/tasksListLoadSaga';
import { loadWorklogListSagaWatcher } from './actionEffects/activity/loadWorklogListSaga';
import { updateWorklogFilterSagaWatcher } from './actionEffects/activity/updateWorklogFilterSaga';
import { updateSettingsSagaWatcher } from './actionEffects/settings/updateSettingsSaga';
import { updateActivityFilterSagaWatcher } from './actionEffects/activity/updateActivityFilterSaga';
import { loadTaskSagaWatcher } from './actionEffects/tasks/loadTaskSaga';
import { startStopTimerSagaWatcher } from './actionEffects/timer/startStopTimerSaga';
import { updateTasksFiltersSagaWatcher } from './actionEffects/tasks/updateTasksFiltersSaga';
import { toggleUserFilterSagaWatcher } from './actionEffects/tasks/toggleUserFilterSaga';
import { nullifyUserFilterSagaWatcher } from './actionEffects/tasks/nullifyUserFilterSaga';
import { loadMetasSagaWatcher } from './actionEffects/meta/loadMetasSaga';
import { appLoggerWatcher } from './sagaChannels/generic/alert/watcher';
import { loadActivityListSagaWatcher } from './actionEffects/activity/loadActivityListSaga';
import { saveNoteSagaWatcher } from './actionEffects/notes/saveNoteNoteSaga';
import { loadPeopleSagaWatcher } from './actionEffects/people/loadPeopleSaga';
import { saveReminderSagaWatcher } from './actionEffects/reminders/saveReminderSaga';
import { updateNotesFiltersSagaWatcher } from './actionEffects/notes/updateNotesFiltersSaga';
import { updatePeopleFilterSagaWatcher } from './actionEffects/people/updatePeopleFilterSaga';
import { updateRemindersFiltersSagaWatcher } from './actionEffects/reminders/updateRemindersFiltersSaga';
import { saveTodoSagaWatcher } from './actionEffects/todo/saveTodoSaga';
import { updateTodoFiltersSagaWatcher } from './actionEffects/todo/updateTodoFiltersSaga';
import { loadUsersForAutosuggestSagaWatcher } from './actionEffects/people/loadUsersForAutosuggestSaga';
import { apploggerError } from './sagaChannels/generic/alert/helpers';
import { appEventsChannelWatcher } from './sagaChannels/events/appEvents/watcher';
import { timerWatcher } from './sagaChannels/events/timeEvents/watcher';
import { triggerAppErrorSagaWatcher } from './actionEffects/general/triggerAppErrorSaga';
import { loadAppUserWorklogSagaWatcher } from './actionEffects/activity/loadAppUserWorklogSaga';

/**
 * rootSaga
 *
 * Create Root Saga
 */
export function* rootSaga() {
  const sagas = [
    appLoggerWatcher,
    loadActivityListSagaWatcher,
    loadWorklogListSagaWatcher,
    updateActivityFilterSagaWatcher,
    updateWorklogFilterSagaWatcher,
    loadMetasSagaWatcher,
    updateSettingsSagaWatcher,
    loadTaskSagaWatcher,
    nullifyUserFilterSagaWatcher,
    startStopTimerSagaWatcher,
    tasksListLoadSagaWatcher,
    toggleUserFilterSagaWatcher,
    updateTasksFiltersSagaWatcher,
    saveNoteSagaWatcher,
    updateNotesFiltersSagaWatcher,
    loadPeopleSagaWatcher,
    loadUsersForAutosuggestSagaWatcher,
    updatePeopleFilterSagaWatcher,
    saveReminderSagaWatcher,
    updateRemindersFiltersSagaWatcher,
    saveTodoSagaWatcher,
    updateTodoFiltersSagaWatcher,
    triggerAppErrorSagaWatcher,
    loadAppUserWorklogSagaWatcher,
    appEventsChannelWatcher,
    timerWatcher,
  ];

  yield all(
    sagas.map(saga =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            yield call(apploggerError, e);
          }
        }
      }),
    ),
  );
}
