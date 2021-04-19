import { EntityID } from '../../types/interfaces/global/EntityID';

/**
 * TypeEntity
 */
export default interface TypeEntity {
  id: EntityID;
  description: string;
  iconUrl: string;
  name: string;
}
