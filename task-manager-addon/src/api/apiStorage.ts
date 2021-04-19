import { Dictionary } from 'tsyringe/dist/typings/types';
import { TasksFilter } from './apiTypes';
import { RepoEntities, RepoEntitySources } from '../models/types';
import TaskEntity from '../models/entities/Task';
import UserEntity from '../models/entities/User';
import WorklogEntity from '../models/entities/Worklog';
import ActivityEntity from '../models/entities/Activity';
import PeopleFilter from '../types/interfaces/objects/PeopleFilter';
import { Nullable } from '../types/templates/Nullable';
import { OptionalObj } from '../types/templates/OptionalObj';
import { EntityID } from '../types/interfaces/global/EntityID';
import { DayjsObj } from '../types/interfaces/datetime/DayjsObj';

/**
 * ApiStorage
 *
 * Data ApiStorage (API)
 */
export interface ApiStorage {
  getOne<T extends RepoEntities>(table: RepoEntitySources, id: EntityID): Promise<Nullable<T>>;

  getAll<T extends RepoEntities>(table: RepoEntitySources): Promise<Dictionary<T>>;

  countAll(table: RepoEntitySources): Promise<number>;

  getFilteredTasks(filter: TasksFilter, start?: number, end?: number): Promise<Dictionary<TaskEntity>>;

  getFilteredUsers(filter: Nullable<PeopleFilter>, start?: number, end?: number): Promise<Dictionary<UserEntity>>;

  countFilteredTasks(filter: TasksFilter, start?: number, end?: number): Promise<number>;

  getFilteredWorklogs(
    userId?: Nullable<EntityID>,
    date?: Nullable<OptionalObj<DayjsObj>>,
    page?: number,
  ): Promise<WorklogEntity[]>;

  getFilteredActivity(userId?: Nullable<EntityID>, page?: number): Promise<ActivityEntity[]>;
}
