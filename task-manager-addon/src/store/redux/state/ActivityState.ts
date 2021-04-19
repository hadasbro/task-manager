import WorklogEntity from '../../../models/entities/Worklog';
import ActivityEntity from '../../../models/entities/Activity';
import { WorklogFilter } from '../../../types/interfaces/objects/WorklogFilter';
import { ActivityFilter } from '../../../types/interfaces/objects/ActivityFilter';

/**
 * ActivityState
 */
export interface ActivityState {
  worklogList: WorklogEntity[];
  appUserLastWorklogList: WorklogEntity[];
  activityList: ActivityEntity[];
  worklogFilter: WorklogFilter;
  activityFilter: ActivityFilter;
}
