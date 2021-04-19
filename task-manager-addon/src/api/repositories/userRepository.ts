import 'reflect-metadata';
import { inject, singleton } from 'tsyringe';
import { StorageKey } from '../apiTypes';
import type { ApiStorages } from '../apiTypes';
import ReadRepository from './base/ReadRepository';
import UserEntity from '../../models/entities/User';
import PeopleFilter from '../../types/interfaces/objects/PeopleFilter';
import { Nullable } from '../../types/templates/Nullable';
import { Dict } from '../../types/templates/Dict';

/**
 * TypeRepository
 */
@singleton()
export class UserRepository extends ReadRepository<UserEntity> {
  constructor(@inject(StorageKey) api?: ApiStorages) {
    super(api!, 'users');
  }

  /**
   * getFiltered
   *
   * @param filter
   */
  public async getFiltered(filter: Nullable<PeopleFilter>): Promise<Dict<UserEntity>> {
    return this.storage.getFilteredUsers(filter);
  }
}
