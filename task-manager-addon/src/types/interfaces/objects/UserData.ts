import { ActiveTask } from '../../../init/enums/settings/ActiveTask';
import { Nullable } from '../../templates/Nullable';

/**
 * UserData
 */
export interface UserData {
  lastActiveTask: Nullable<ActiveTask>;
}
