import 'reflect-metadata';
import { inject, singleton } from 'tsyringe';
import { StorageKey } from '../apiTypes';
import type { ApiStorages } from '../apiTypes';
import ReadRepository from './base/ReadRepository';
import WorklogEntity from '../../models/entities/Worklog';
import { Nullable } from '../../types/templates/Nullable';
import { OptionalObj } from '../../types/templates/OptionalObj';
import { EntityID } from '../../types/interfaces/global/EntityID';
import { DayjsObj } from '../../types/interfaces/datetime/DayjsObj';

/**
 * WorklogRepository
 */
@singleton()
export class WorklogRepository extends ReadRepository<WorklogEntity> {
  constructor(@inject(StorageKey) api?: ApiStorages) {
    super(api!, 'worklogs');
  }

  /**
   * getFiltered
   *
   * @param userId
   * @param date
   * @param page
   */
  public async getFiltered(
    userId?: Nullable<EntityID>,
    date?: Nullable<OptionalObj<DayjsObj>>,
    page?: number,
  ): Promise<WorklogEntity[]> {
    return this.storage.getFilteredWorklogs(userId, date, page);
  }
}
