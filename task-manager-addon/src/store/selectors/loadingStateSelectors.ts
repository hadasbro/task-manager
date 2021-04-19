import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../redux/AppState';
import { LoadingState } from '../redux/state/LoadingState';
import { loadingSliceInitialState } from '../redux/general/loadingStateSlice';

/**
 * activitySelector
 *
 * @param state
 */
const loadingStateSelector = (state: AppState): LoadingState => state.loadingSlice || loadingSliceInitialState;
/**
 * loadingStateMeta
 */
export const loadingStateMeta = createSelector(loadingStateSelector, ud => ud.meta);

/**
 * loadingStatePeople
 */
export const loadingStatePeople = createSelector(loadingStateSelector, ud => ud.people);

/**
 * loadingStateActivity
 */
export const loadingStateActivity = createSelector(loadingStateSelector, ud => ud.activity);

/**
 * loadingStateSettings
 */
export const loadingStateSettings = createSelector(loadingStateSelector, ud => ud.settings);

/**
 * loadingStateTasks
 */
export const loadingStateTasks = createSelector(loadingStateSelector, ud => ud.tasks);
