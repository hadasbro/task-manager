/* eslint-disable class-methods-use-this */
import { Write } from '../interfaces/Write';
import { Read } from '../interfaces/Read';
import { ApiStorages } from '../../apiTypes';
import NotImplementedException from '../../../exceptions/system/NotImplementedException';
import { RepoEntities, RepoEntitySources } from '../../../models/types';
import { Nullable } from '../../../types/templates/Nullable';
import { Dict } from '../../../types/templates/Dict';
import { EntityID } from '../../../types/interfaces/global/EntityID';

/**
 * ReadWriteRepository
 */
export default abstract class ReadWriteRepository<T extends RepoEntities> implements Write<T>, Read<T> {
  protected constructor(protected readonly storage: ApiStorages, protected readonly table: RepoEntitySources) {}

  // abstract get(item: any): T;
  // abstract mapApiObjectToEntity(item: any): T;

  async create(item: T): Promise<boolean> {
    throw new NotImplementedException();
  }

  async update(id: EntityID, item: T): Promise<boolean> {
    throw new NotImplementedException();
  }

  async delete(id: EntityID): Promise<boolean> {
    throw new NotImplementedException();
  }

  public async getOneById(id: EntityID): Promise<Nullable<T>> {
    return this.storage.getOne<T>(this.table, id);
  }

  public async getAll(): Promise<Dict<T>> {
    return this.storage.getAll<T>(this.table);
  }

  public async countAll(): Promise<number> {
    return this.storage.countAll(this.table);
  }
}
