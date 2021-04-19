/* eslint-disable class-methods-use-this */
import { Read } from '../interfaces/Read';
import { ApiStorages } from '../../apiTypes';
import NotImplementedException from '../../../exceptions/system/NotImplementedException';
import { RepoEntities, RepoEntitySources } from '../../../models/types';
import { Nullable } from '../../../types/templates/Nullable';
import { Dict } from '../../../types/templates/Dict';
import { EntityID } from '../../../types/interfaces/global/EntityID';

/**
 * ReadRepository
 */
export default abstract class ReadRepository<T extends RepoEntities> implements Read<T> {
  /**
   * constructor
   *
   * @param storage
   * @param table
   * @protected
   */
  protected constructor(protected readonly storage: ApiStorages, protected readonly table: RepoEntitySources) {}

  /**
   * getAllByExample
   *
   * @param item
   */
  public async getAllByExample(...item: T[]): Promise<T[]> {
    throw new NotImplementedException();
  }

  /**
   * getOneByExample
   *
   * @param item
   */
  public async getOneByExample(...item: T[]): Promise<T> {
    throw new NotImplementedException();
  }

  /**
   * getOneById
   *
   * @param id
   */
  public async getOneById(id: EntityID): Promise<Nullable<T>> {
    return this.storage.getOne<T>(this.table, id);
  }

  /**
   * getAll
   */
  public async getAll(): Promise<Dict<T>> {
    return this.storage.getAll<T>(this.table);
  }

  /**
   * countAll
   */
  async countAll(): Promise<number> {
    return this.storage.countAll(this.table);
  }
}
