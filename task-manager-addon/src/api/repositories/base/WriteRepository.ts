/* eslint-disable class-methods-use-this */
import { Write } from '../interfaces/Write';
import { ApiStorages } from '../../apiTypes';
import { RepoEntities, RepoEntitySources } from '../../../models/types';
import NotImplementedException from '../../../exceptions/system/NotImplementedException';
import { EntityID } from '../../../types/interfaces/global/EntityID';

/**
 * WriteRepository
 */
export default abstract class WriteRepository<T extends RepoEntities> implements Write<T> {
  /**
   * constructor
   *
   * @param storage
   * @param table
   * @protected
   */
  protected constructor(protected readonly storage: ApiStorages, protected readonly table: RepoEntitySources) {}

  /**
   * create
   *
   * @param item
   */
  async create(item: T): Promise<boolean> {
    return Promise.resolve(true);
  }

  /**
   * update
   *
   * @param id
   * @param item
   */
  async update(id: EntityID, item: T): Promise<boolean> {
    throw new NotImplementedException();
  }

  /**
   * rem
   *
   * @param id
   */
  async delete(id: EntityID): Promise<boolean> {
    throw new NotImplementedException();
  }
}
