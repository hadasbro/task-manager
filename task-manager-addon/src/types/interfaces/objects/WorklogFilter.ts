import UserEntity from '../../../models/entities/User';
import { Nullable } from '../../templates/Nullable';
import { OptionalDayjsObj } from '../datetime';
import { WorklogUser } from '../selecttors/worklog';

/**
 * WorklogFilter
 */
export type WorklogFilter = {
  user?: Nullable<UserEntity>;
  date?: Nullable<OptionalDayjsObj>;
  page?: number;
};
