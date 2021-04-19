import TaskEntity from '../entities/Task';
import PriorityEntity from '../entities/Priority';
import TypeEntity from '../entities/Type';
import StatusEntity from '../entities/Status';
import ProjectEntity from '../entities/Project';
import UserEntity from '../entities/User';
import ActivityEntity from '../entities/Activity';
import WorklogEntity from '../entities/Worklog';

/**
 * Status
 */
export type TaskStatus = Pick<TaskEntity, 'id' | 'name'>;

/**
 * RepoEntitySources
 */
export type RepoEntitySources =
  | 'priority'
  | 'issueType'
  | 'status'
  | 'project'
  | 'tasks'
  | 'users'
  | 'activities'
  | 'worklogs'; // | 'comments';

export type RepoEntities =
  | PriorityEntity
  | TypeEntity
  | StatusEntity
  | ProjectEntity
  | TaskEntity
  | UserEntity
  | ActivityEntity
  | WorklogEntity; // | CommentEntity;

/**
 * TaskCommentToAdd
 */
export type TaskCommentToAdd = {
  taskId: number;
  comment: string;
};
