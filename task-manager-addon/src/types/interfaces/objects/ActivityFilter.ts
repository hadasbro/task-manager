import UserEntity from '../../../models/entities/User';
import { Nullable } from '../../templates/Nullable';

/**
 * ActivityFilter
 */
export type ActivityFilter = {
  user?: Nullable<UserEntity>;
  page?: number;
};
