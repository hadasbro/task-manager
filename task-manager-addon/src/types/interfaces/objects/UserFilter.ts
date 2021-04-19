import UserEntity from '../../../models/entities/User';
import { Nullable } from '../../templates/Nullable';

/**
 * UserFilter
 */
export default interface UserFilter {
  user?: Nullable<UserEntity>;
  page?: number;
}
