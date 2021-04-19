import TaskEntity from '../../../models/entities/Task';
import { TaskActivityStatus } from './TaskActivityStatus';

/**
 * ActiveTask
 */
export type ActiveTask = {
  task: TaskEntity;
  status: TaskActivityStatus;
};
