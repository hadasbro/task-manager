import ProjectEntity from './Project';
import StatusEntity from './Status';
import PriorityEntity from './Priority';
import TypeEntity from './Type';
import { EntityID } from '../../types/interfaces/global/EntityID';

/**
 * TaskEntity
 */
export default interface TaskEntity {
  // related entities
  typeId: EntityID;
  projectId: EntityID;
  statusId: EntityID;
  priorityId: EntityID;
  subtasksIds: TaskEntity[];

  id: EntityID;
  url: string;
  key: string;
  description: string;
  name: string;
  authorId: string;
  authorName: string;
  reporterId: string;
  reporterName: string;
  assigneeId: string | null;
  assigneeName: string | null;
  observerIds: string[];
  timeTodayUser: number;
  timeAllUser: number;
  timeTodayAll: number;
  timeAllAll: number;
  created: string;
  updated: string;
}

/**
 * TaskEntity
 *
 * Full Task with relations
 */
export interface TaskEntityRelations extends TaskEntity {
  readonly project: ProjectEntity;
  readonly type: TypeEntity;
  readonly status: StatusEntity;
  readonly priority: PriorityEntity;
}

/**
 * SubTaskEntity
 */
export interface SubTaskEntity {
  // related entities
  typeId: EntityID;
  projectId: EntityID;
  statusId: EntityID;
  priorityId: EntityID;

  url: string;
  id: string;
  key: string;
  description: string;
  name: string;
}
