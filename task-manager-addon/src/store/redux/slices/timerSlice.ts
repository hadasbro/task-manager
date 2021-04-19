/* eslint-disable no-param-reassign */
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'store/utils/toolkit/helpers';
import { TimerState } from '../state/TimerState';
import { TimerActionPayload } from '../../../types/interfaces/store/TimerActionPayload';
import { EntityID } from '../../../types/interfaces/global/EntityID';

/**
 * timerSliceInitialState
 */
export const timerSliceInitialState: TimerState = {
  timerLogs: {
    task_id1: {
      timer_id1: [
        {
          years: 2021,
          months: 4,
          date: 12,
          hours: 12,
          minutes: 40,
          seconds: 0,
          milliseconds: 0,
        },
        {
          years: 2021,
          months: 4,
          date: 12,
          hours: 16,
          minutes: 45,
          seconds: 0,
          milliseconds: 0,
        },
      ],
      timer_id2: [
        {
          years: 2021,
          months: 4,
          date: 12,
          hours: 18,
          minutes: 46,
          seconds: 0,
          milliseconds: 0,
        },
        {
          years: 2021,
          months: 4,
          date: 12,
          hours: 22,
          minutes: 12,
          seconds: 0,
          milliseconds: 0,
        },
      ],
    },
  },
  activeTimerId: null,
};

/**
 * timerSlice
 */
const timerSlice = createSlice({
  name: 'timerSlice',
  initialState: timerSliceInitialState,
  reducers: {
    /**
     * startStopTimerOnTask
     *
     * @param state
     * @param taskId
     * @param taskAction
     */
    startStopTimerOnTask: (state, { payload: { taskId, taskAction } }: PayloadAction<TimerActionPayload>) => {},

    /**
     * stopTimerOnTask
     *
     * @param state
     * @param payload
     */
    stopTimerOnTask: (state, { payload }: PayloadAction<EntityID>) => {},

    /**
     * stopTimerOnCurentlyRunningTask
     *
     * @param state
     */
    stopTimerOnCurentlyRunningTask: state => {},
  },
});

export const { actions: timerSliceActions, reducer: timerSliceReducer } = timerSlice;
