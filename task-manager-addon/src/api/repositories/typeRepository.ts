import 'reflect-metadata';
import { inject, singleton } from 'tsyringe';
import { StorageKey } from '../apiTypes';
import type { ApiStorages } from '../apiTypes';
import ReadRepository from './base/ReadRepository';
import TypeEntity from '../../models/entities/Type';

/**
 * TypeRepository
 */
@singleton()
export class TypeRepository extends ReadRepository<TypeEntity> {
  constructor(@inject(StorageKey) api?: ApiStorages) {
    // super(api!, TypeEntity.TABLE);
    super(api!, 'issueType');
  }
}
