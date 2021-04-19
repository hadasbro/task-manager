import { ApiStorage } from '../../apiStorage';
import { TasksFilter } from '../../apiTypes';
import { RepoEntities, RepoEntitySources } from '../../../models/types';
import TaskEntity from '../../../models/entities/Task';
import JiraApi from './JiraApi';
import UserEntity from '../../../models/entities/User';
import WorklogEntity from '../../../models/entities/Worklog';
import ActivityEntity from '../../../models/entities/Activity';
import { OptionalObj } from '../../../types/templates/OptionalObj';
import PeopleFilter from '../../../types/interfaces/objects/PeopleFilter';
import { Dict } from '../../../types/templates/Dict';
import ApiConfigInterface from '../../../types/interfaces/objects/Config';
import { Nullable } from '../../../types/templates/Nullable';
import { EntityID } from '../../../types/interfaces/global/EntityID';
import { DayjsObj } from '../../../types/interfaces/datetime/DayjsObj';

/**
 * JiraStorage
 */
export default class JiraStorage implements ApiStorage {
  /**
   * JiraApi
   *
   * @private
   */
  private api: JiraApi;

  /**
   * constructor
   *
   * @param config
   */
  constructor(config: ApiConfigInterface) {
    this.api = new JiraApi(config);
  }

  /**
   * getAll
   *
   * @param source
   */
  public getAll<T extends RepoEntities>(source: RepoEntitySources): Promise<Dict<T>> {
    return this.api.services[source].getAll() as Promise<Dict<T>>;
  }

  /**
   * getOne
   *
   * @param source
   * @param id
   */
  public getOne<T extends RepoEntities>(source: RepoEntitySources, id: EntityID): Promise<Nullable<T>> {
    return this.api.services[source].getOne(id) as Promise<T>;
  }

  /**
   * countAll
   *
   * @param source
   */
  public countAll(source: RepoEntitySources): Promise<number> {
    return this.api.services[source].countAll();
  }

  /**
   * getFiltered
   *
   * @param filter
   * @param start
   * @param end
   */
  public getFilteredTasks(filter: TasksFilter, start?: number, end?: number): Promise<Dict<TaskEntity>> {
    return this.api.services.tasks.getFiltered(filter);
  }

  /**
   * getFilteredUsers
   *
   * @param filter
   * @param page
   */
  public getFilteredUsers(filter: Nullable<PeopleFilter>, page?: number): Promise<Dict<UserEntity>> {
    return this.api.services.users.getFiltered(filter, page);
  }

  /**
   * getFilteredWorklogs
   *
   * @param userId
   * @param date
   * @param page
   */
  public getFilteredWorklogs(
    userId?: Nullable<EntityID>,
    date?: Nullable<OptionalObj<DayjsObj>>,
    page?: number,
  ): Promise<WorklogEntity[]> {
    return this.api.services.worklogs.getFiltered(userId, date);
  }

  /**
   * getFilteredActivity
   *
   * {taskID: Dict[]}
   *
   * @param userId
   * @param page
   */
  public getFilteredActivity(userId?: Nullable<EntityID>, page?: number): Promise<ActivityEntity[]> {
    return this.api.services.activities.getFiltered(userId, page);
  }

  /**
   * countFiltered
   *
   * @param filter
   * @param start
   * @param end
   */
  public countFilteredTasks(filter: TasksFilter, start?: number, end?: number): Promise<number> {
    return this.api.services.tasks.countFiltered(filter);
  }
}
