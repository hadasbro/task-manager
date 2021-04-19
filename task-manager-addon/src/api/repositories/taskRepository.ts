import { inject, singleton } from 'tsyringe';
import { StorageKey, TasksFilter } from '../apiTypes';
import type { ApiStorages } from '../apiTypes';
import TaskEntity from '../../models/entities/Task';
import ReadWriteRepository from './base/ReadWriteRepository';
import FilterOrder from '../../types/interfaces/objects/FilterOrder';
import { Dict } from '../../types/templates/Dict';

/**
 * TaskRepository
 */
@singleton()
export class TaskRepository extends ReadWriteRepository<TaskEntity> {
  constructor(@inject(StorageKey) api?: ApiStorages) {
    // super(api!, TaskEntity.TABLE);
    super(api!, 'tasks');
  }

  /**
   * getFiltered
   *
   * @param filterOrder
   * @param start
   * @param end
   */
  public async getFiltered(filterOrder: FilterOrder, start?: number, end?: number): Promise<Dict<TaskEntity>> {
    return this.storage.getFilteredTasks(filterOrder as TasksFilter, start, end);
  }

  /**
   * countFiltered
   *
   * @param filterOrder
   * @param start
   * @param end
   */
  public async countFiltered(filterOrder: FilterOrder, start?: number, end?: number): Promise<number> {
    return this.storage.countFilteredTasks(filterOrder as TasksFilter, start, end);
  }
}
