import 'reflect-metadata';
import { inject, singleton } from 'tsyringe';
import { StorageKey } from '../apiTypes';
import type { ApiStorages } from '../apiTypes';
import ReadRepository from './base/ReadRepository';
import ActivityEntity from '../../models/entities/Activity';
import { Nullable } from '../../types/templates/Nullable';
import { EntityID } from '../../types/interfaces/global/EntityID';

/**
 * ActivityRepository
 */
@singleton()
export class ActivityRepository extends ReadRepository<ActivityEntity> {
  constructor(@inject(StorageKey) api?: ApiStorages) {
    super(api!, 'activities');
  }

  /**
   * getFiltered
   *
   * @param userId
   * @param page
   */
  public async getFiltered(userId?: Nullable<EntityID>, page?: number): Promise<ActivityEntity[]> {
    return this.storage.getFilteredActivity(userId, page);
  }
}
