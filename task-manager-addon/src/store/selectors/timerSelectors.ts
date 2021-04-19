import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../redux/AppState';
import { TimerState } from '../redux/state/TimerState';
import { timerSliceInitialState } from '../redux/slices/timerSlice';

/**
 * timerSelector
 * @param state
 */
const timerSelector = (state: AppState): TimerState => state.timerSlice || timerSliceInitialState;

/**
 * selectTimerLogs
 */
export const selectTimerLogs = createSelector(timerSelector, t => t.timerLogs);
