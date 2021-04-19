import { inject, singleton } from 'tsyringe';
import { StorageKey } from '../apiTypes';
import type { ApiStorages } from '../apiTypes';
import ReadRepository from './base/ReadRepository';
import StatusEntity from '../../models/entities/Status';

/**
 * StatusRepository
 */
@singleton()
export class StatusRepository extends ReadRepository<StatusEntity> {
  constructor(@inject(StorageKey) api?: ApiStorages) {
    // super(api!, StatusEntity.TABLE);
    super(api!, 'status');
  }
}
