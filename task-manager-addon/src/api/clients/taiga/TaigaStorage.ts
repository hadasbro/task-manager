/* eslint-disable */
import { ApiStorage } from '../../apiStorage';
import { TasksFilter } from '../../apiTypes';
import { RepoEntities, RepoEntitySources } from '../../../models/types';
import TaskEntity from '../../../models/entities/Task';
import UserEntity from '../../../models/entities/User';
import ActivityEntity from '../../../models/entities/Activity';
import WorklogEntity from '../../../models/entities/Worklog';
import PeopleFilter from '../../../types/interfaces/objects/PeopleFilter';
import { Nullable } from '../../../types/templates/Nullable';
import { Dict } from '../../../types/templates/Dict';
import { OptionalObj } from '../../../types/templates/OptionalObj';
import { EntityID } from '../../../types/interfaces/global/EntityID';
import { DayjsObj } from '../../../types/interfaces/datetime/DayjsObj';

/**
 * TaigaStorage
 */
export class TaigaStorage implements ApiStorage {
  public getAll<T extends RepoEntities>(source: RepoEntitySources): Promise<Dict<T>> {
    return Promise.resolve({});
  }

  public getOne<T extends RepoEntities>(source: RepoEntitySources, id: EntityID): Promise<Nullable<T>> {
    return Promise.resolve(null);
  }

  public countAll(source: RepoEntitySources): Promise<number> {
    return Promise.resolve(0);
  }

  public getFilteredTasks(filter: TasksFilter, start?: number, end?: number): Promise<Dict<TaskEntity>> {
    return Promise.resolve({});
  }

  public countFilteredTasks(filter: TasksFilter, start?: number, end?: number): Promise<number> {
    return Promise.resolve(0);
  }

  public getFilteredUsers(filter: Nullable<PeopleFilter>, start?: number, page?: number): Promise<Dict<UserEntity>> {
    return Promise.resolve({});
  }

  public getFilteredActivity(userId?: Nullable<EntityID>, page?: number): Promise<ActivityEntity[]> {
    return Promise.resolve([]);
  }

  public getFilteredWorklogs(
    userId?: Nullable<EntityID>,
    date?: Nullable<OptionalObj<DayjsObj>>,
    end?: number,
  ): Promise<WorklogEntity[]> {
    return Promise.resolve([]);
  }
}
