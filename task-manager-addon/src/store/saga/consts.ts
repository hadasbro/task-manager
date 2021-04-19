/**
 *
 * SagaActions
 *
 * All Saga actions we allow in the system.
 *
 * There is only 1 rule here:
 * the "key" must be the same as "value" e.g.
 *
 * enum SagaActions {
 *   a: 'a',
 *   b: 'b',
 *   c: 'c'
 * }
 *
 * How to namespace saga actions?
 * If it is needed, then the easiest way is to do e.g.
 *
 * - prefix_actionName
 * - group_acitonName
 * - todo_updateAll
 * - todo_refreshList
 * - tasks_updateAll
 * -tasks_refreshList
 *
 * reminders_updateAll
 * reminders_refreshList
 */

// noinspection JSUnusedGlobalSymbols
export enum SagaActions {
  // tasks
  tasksListLoadSaga = 'tasksListLoadSaga',
  updateTasksFiltersSaga = 'updateTasksFiltersSaga',
  toggleUserFilterSaga = 'toggleUserFilterSaga',
  nullifyUserFilterSaga = 'nullifyUserFilterSaga',
  loadTaskSaga = 'loadTaskSaga',
  startStopTimerSaga = 'startStopTimerSaga',

  // settings
  updateSettingsSaga = 'updateSettingsSaga',

  // activity stream (activity, worklog, people)
  loadWorklogListSaga = 'loadWorklogListSaga',
  loadActivityListSaga = 'loadActivityListSaga',
  updateActivityFilterSaga = 'updateActivityFilterSaga',
  updateWorklogFilterSaga = 'updateWorklogFilterSaga',
  loadAppUserWorklogSaga = 'loadAppUserWorklogSaga',

  // meta data (statuses, projects, tasks types, etc.)
  loadMetasSaga = 'loadMetasSaga',

  // notes
  updateNotesFiltersSaga = 'updateNotesFiltersSaga',
  saveNoteNoteSaga = 'saveNoteNoteSaga',

  // reminders
  updateRemindersFiltersSaga = 'updateRemindersFiltersSaga',
  saveReminderSaga = 'saveReminderSaga',

  // todos
  updateTodoFiltersSaga = 'updateTodoFiltersSaga',
  saveTodoSaga = 'saveTodoSaga',

  // people
  loadUsersForAutosuggestSaga = 'loadUsersForAutosuggestSaga',
  loadPeopleSaga = 'loadPeopleSaga',
  updatePeopleFilterSaga = 'updatePeopleFilterSaga',

  // general
  triggerAppErrorSaga = 'triggerAppErrorSaga',
}
