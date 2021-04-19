import { EntityID } from '../../types/interfaces/global/EntityID';

/**
 * PriorityEntity
 */
export default interface PriorityEntity {
  id: EntityID;
  description: string;
  iconUrl: string;
  name: string;
  priority: number;
}
