import { Nullable } from '../../templates/Nullable';
import { EntityID } from '../global/EntityID';

/**
 * FilterOrder
 */
export default interface PeopleFilter {
  userName?: Nullable<string>;
  userId?: Nullable<EntityID>;
  page?: number;
}
