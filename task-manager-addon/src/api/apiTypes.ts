import JiraStorage from './clients/jira/JiraStorage';
import { TargetprocessStorage } from './clients/targetprocess/TargetprocessStorage';
import { BacklogStorage } from './clients/backlog/BacklogStorage';
import { TaigaStorage } from './clients/taiga/TaigaStorage';
import { DayjsObj } from '../types/interfaces/datetime/DayjsObj';
import { TasksOrders } from '../types/interfaces/listings/TasksOrders';

/**
 * ApiStorages
 */
export type ApiStorages = JiraStorage | TargetprocessStorage | BacklogStorage | TaigaStorage;

/**
 * StorageKey
 */
export const StorageKey = Symbol.for('DIStorage');

/**
 * TasksFilter
 */
export interface TasksFilter {
  search: string;
  projectIdIn: string[];
  assigneeIdIs: string;
  observerIdIs: string;
  reporterIdIs: string;
  typeIdIn: string[];
  priorityIdIn: string[];
  statusIdIn: string[];
  lastActivityAllSince: DayjsObj;
  lastActivityUserSince: DayjsObj;
  orderBy: TasksOrders;
  otherThings: string[];
}
