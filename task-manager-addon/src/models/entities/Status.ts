import { EntityID } from '../../types/interfaces/global/EntityID';

/**
 * StatusEntity
 */
export default interface StatusEntity {
  id: EntityID;
  description: string;
  iconUrl: string;
  name: string;
  statusCategoryColor: string;
  statusCategoryKey: string;
  statusCategoryName: string;
  statusCategoryId: string;
}
