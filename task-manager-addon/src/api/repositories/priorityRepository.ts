import { inject, singleton } from 'tsyringe';
import { StorageKey } from '../apiTypes';
import type { ApiStorages } from '../apiTypes';
import ReadRepository from './base/ReadRepository';
import PriorityEntity from '../../models/entities/Priority';

/**
 * PriorityRepository
 */
@singleton()
export class PriorityRepository extends ReadRepository<PriorityEntity> {
  constructor(@inject(StorageKey) api?: ApiStorages) {
    // super(api!, PriorityEntity.TABLE);
    super(api!, 'priority');
  }
}
