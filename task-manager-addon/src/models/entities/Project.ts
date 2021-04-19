import { EntityID } from '../../types/interfaces/global/EntityID';

/**
 * ProjectEntity
 */
export default interface ProjectEntity {
  id: EntityID;
  avatarUrl: string;
  name: string;
  url: string;
}
