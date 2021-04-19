import ProjectEntity from '../../../models/entities/Project';
import TypeEntity from '../../../models/entities/Type';
import PriorityEntity from '../../../models/entities/Priority';
import StatusEntity from '../../../models/entities/Status';
import { Nullable } from '../../templates/Nullable';
import { DayjsObj } from '../datetime/DayjsObj';
import { TasksOrders } from '../listings/TasksOrders';

/**
 * FilterOrder
 */
export default interface FilterOrder {
  search?: Nullable<string>;
  projectIdIn: ProjectEntity['id'][];
  assigneeIdIs: Nullable<string>;
  observerIdIs: Nullable<string>;
  reporterIdIs: Nullable<string>;
  typeIdIn: TypeEntity['id'][];
  priorityIdIn: PriorityEntity['id'][];
  statusIdIn: StatusEntity['id'][];
  lastActivityAllSince: DayjsObj;
  lastActivityUserSince: DayjsObj;
  orderBy: TasksOrders;
}

/**
 * UserIsFilter
 */
export type UserIsFilter = Pick<FilterOrder, 'reporterIdIs' | 'assigneeIdIs' | 'observerIdIs'>;
