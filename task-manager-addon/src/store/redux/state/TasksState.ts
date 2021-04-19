import { Dict } from '../../../types/templates/Dict';
import { Nullable } from '../../../types/templates/Nullable';
import TaskEntity from '../../../models/entities/Task';

/**
 * TasksState
 */
export interface TasksState {
  tasksList: Dict<TaskEntity>;
  currentTask: Nullable<TaskEntity>;
}
