/* eslint-disable no-param-reassign */
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'store/utils/toolkit/helpers';
import WorklogEntity from '../../../models/entities/Worklog';
import ActivityEntity from '../../../models/entities/Activity';
import { ActivityState } from '../state/ActivityState';
import { WorklogFilter } from '../../../types/interfaces/objects/WorklogFilter';
import { ActivityFilter } from '../../../types/interfaces/objects/ActivityFilter';

/**
 * activitySliceInitialState
 */
export const activitySliceInitialState: ActivityState = {
  worklogList: [],
  appUserLastWorklogList: [],
  worklogFilter: {},
  activityList: [],
  activityFilter: {},
};

/**
 * activitySlice
 */
const activitySlice = createSlice({
  name: 'activitySlice',
  initialState: activitySliceInitialState,
  reducers: {
    /**
     * worklogListLoad
     *
     * @param state
     * @param worklogs
     */
    worklogListLoad: (state, { payload: worklogs }: PayloadAction<WorklogEntity[]>) => {
      state.worklogList = worklogs;
    },

    /**
     * activityListLoad
     *
     * @param state
     * @param activityList
     */
    activityListLoad: (state, { payload: activityList }: PayloadAction<ActivityEntity[]>) => {
      state.activityList = activityList;
    },

    /**
     * worklogFilterUpdate
     *
     * @param state
     * @param filter
     */
    worklogFilterUpdate(state, { payload: filter }: PayloadAction<WorklogFilter>) {
      state.worklogFilter = filter;
    },

    /**
     * activityFilterUpdate
     *
     * @param state
     * @param filter
     */
    activityFilterUpdate(state, { payload: filter }: PayloadAction<ActivityFilter>) {
      state.activityFilter = filter;
    },

    /**
     * loadAppUserWorklog
     *
     * @param state
     * @param worklog
     */
    loadAppUserWorklog(state, { payload: worklog }: PayloadAction<WorklogEntity[]>) {
      state.appUserLastWorklogList = worklog;
    },
  },
});

export const { actions: activitySliceActions, reducer: activitySliceReducer } = activitySlice;
