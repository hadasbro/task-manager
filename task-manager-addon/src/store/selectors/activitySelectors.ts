import { createSelector } from '@reduxjs/toolkit';
import { activitySliceInitialState } from '../redux/slices/activitySlice';
import WorklogEntity from '../../models/entities/Worklog';
import { peopleInitialState } from '../redux/slices/peopleSlice';
import ActivityEntity from '../../models/entities/Activity';
import { Dict } from '../../types/templates/Dict';
import { AppState } from '../redux/AppState';
import { PeopleState } from '../redux/state/PeopleState';
import { ActivityState } from '../redux/state/ActivityState';
import { isDefined } from '../../types/guards/general/isDefined';
import { WorklogByUser } from '../../types/interfaces/selecttors/worklog';

/**
 * worklogEntityGroup
 * @param wlList
 */
const worklogEntityGroup = (wlList: WorklogEntity[]) => {
  if (wlList.length) {
    return wlList.reduce((acc, it) => {
      const uid = `uid-${it.userId}`;
      const keys = Object.keys(acc);

      let allWorklogs: WorklogEntity[];

      if (keys.includes(uid)) {
        allWorklogs = [...acc[uid].worklogs, it];
      } else {
        allWorklogs = [it];
      }

      return {
        ...acc,
        [uid]: {
          userId: it.userId,
          userName: it.userName,
          worklogs: allWorklogs,
        },
      };
    }, {} as WorklogByUser);
  }

  return {};
};
/**
 * activitySelector
 *
 * @param state
 */
const activitySelector = (state: AppState): ActivityState => state.activitySlice || activitySliceInitialState;

/**
 * peopleSelector
 *
 * @param state
 */
const peopleSelector = (state: AppState): PeopleState => state.peopleSlice || peopleInitialState;

/**
 * selectWorklogListSimple
 */
export const selectWorklogListSimple = createSelector(activitySelector, ud => ud.worklogList);

/**
 * selectWorklogListWithUsers
 */
export const selectWorklogListWithUsers = createSelector(activitySelector, ud => ud.worklogList);

/**
 * selectWorklogListWithUsers
 */
export const selectWorklogListUsersGrByUser = createSelector(activitySelector, ud => {
  return worklogEntityGroup(ud.worklogList);
});

/**
 * selectWorklogListUsersGrByUserArray
 */
export const selectWorklogListUsersGrByUserArray = createSelector(selectWorklogListUsersGrByUser, ud => {
  return Object.values(ud);
});

/**
 * selectActivityList
 */
export const selectActivityList = createSelector(activitySelector, ud => ud.activityList);

/**
 * selectActivityListGroupedByTask
 */
export const selectActivityListGroupedByTask = createSelector(activitySelector, ud => {
  const activity: Dict<ActivityEntity[]> = ud.activityList.reduce((acc, it) => {
    const prev = isDefined(acc[it.taskId]) ? [...acc[it.taskId]] : [];
    return { ...acc, [it.taskId]: [...prev, it] };
  }, {});

  return activity;
});

/**
 * selectAutosuggestUser
 */
export const selectAutosuggestUser = createSelector(peopleSelector, ud => ud.autosuggestUser);

/**
 * selectWorklogFilter
 */
export const selectWorklogFilter = createSelector(activitySelector, ud => ud.worklogFilter);

/**
 * selectActivityFilter
 */
export const selectActivityFilter = createSelector(activitySelector, ud => ud.activityFilter);

/**
 * selectAppUserWorklog
 */
export const selectAppUserWorklog = createSelector(activitySelector, ud => {
  return worklogEntityGroup(ud.appUserLastWorklogList);
});

/**
 * selectAppUserWorklogArray
 */
export const selectAppUserWorklogArray = createSelector(selectAppUserWorklog, ud => {
  return Object.values(ud);
});
