import { inject, singleton } from 'tsyringe';
import { StorageKey } from '../apiTypes';
import type { ApiStorages } from '../apiTypes';
import ReadRepository from './base/ReadRepository';
import ProjectEntity from '../../models/entities/Project';

/**
 * ProjectRepositoryProjectRepository
 */
@singleton()
export class ProjectRepository extends ReadRepository<ProjectEntity> {
  constructor(@inject(StorageKey) api?: ApiStorages) {
    // super(api!, ProjectEntity.TABLE);
    super(api!, 'project');
  }
}
