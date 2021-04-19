import { AlertState } from './state/AlertState';
import { ApiConfigState } from './state/ApiConfigState';
import { FilterOrderState } from './state/FilterOrderState';
import { MetaDataState } from './state/MetaDataState';
import { SettingsState } from './state/SettingsState';
import { TasksState } from './state/TasksState';
import { ActivityState } from './state/ActivityState';
import { UserDataState } from './state/UserDataState';
import { PeopleState } from './state/PeopleState';
import { TodoState } from './state/TodoState';
import { TagsState } from './state/TagsState';
import { RemindersState } from './state/RemindersState';
import { NotesState } from './state/NotesState';
import { LoadingState } from './state/LoadingState';
import { TimerState } from './state/TimerState';

/**
 * AppState
 */
export interface AppState {
  appAlertSlice: AlertState;
  apiConfigSlice: ApiConfigState;
  filterOrderSlice: FilterOrderState;
  metaDataSlice: MetaDataState;
  settingsSlice: SettingsState;
  tasksSlice: TasksState;
  activitySlice: ActivityState;
  userDataSlice: UserDataState;
  peopleSlice: PeopleState;
  todoSlice: TodoState;
  tagsSlice: TagsState;
  remindersSlice: RemindersState;
  notesSlice: NotesState;
  loadingSlice: LoadingState;
  timerSlice: TimerState;
}
