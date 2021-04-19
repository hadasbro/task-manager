import { Nullable } from '../../types/templates/Nullable';
import { EntityID } from '../../types/interfaces/global/EntityID';

/**
 * WorklogEntity
 */
export default interface WorklogEntity {
  worklogId: EntityID;
  taskId: EntityID;
  taskKey: string;
  avatarUrl: Nullable<string>;
  userId: EntityID;
  userName: string;
  userLink: string;
  taskLink: string;
  time: string;
  timeSpentSeconds: number;
  updated: string;
}
