/* eslint-disable no-param-reassign */
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'store/utils/toolkit/helpers';
import { dayjsObj } from '../../../extensions/dayjs';
import { SettingsInterface } from '../../../types/interfaces/objects/Setting';
import { ListBlocksOpts } from '../../../init/enums/settings/ListBlocksOpts';
import { SettingsState } from '../state/SettingsState';
import { DetailsOpts } from '../../../init/enums/settings/DetailsOpts';
import { TimeOpts } from '../../../init/enums/settings/TimeOpts';
import { TimerSourceOpts } from '../../../init/enums/settings/TimerSourceOpts';
import { defaultTimePickerDate } from '../../../init/defaults/datetime';

/**
 * settingsSliceInitialState
 */
export const settingsSliceInitialState: SettingsState = {
  settings: {
    activeOnTop: true,
    dblClickDetails: DetailsOpts.DONT_SHOW,
    countInSpecHours: false,
    countFromHour: dayjsObj(defaultTimePickerDate),
    countToHour: dayjsObj(defaultTimePickerDate),
    breaks: {
      // 0: [dayjsObj(defaultTimePickerDate), dayjsObj(testTimePickerDate)],
      // 1: [dayjsObj(defaultTimePickerDate), dayjsObj(testTimePickerDate)],
    },
    inDayMon: true,
    inDayTue: true,
    inDayWed: true,
    inDayThur: true,
    inDayFrid: true,
    inDaySat: false,
    inDaySun: false,
    countTimeAuto: TimeOpts.AUTO,
    timeSource: TimerSourceOpts.BROWSER,
    refreshInEvery: 600,
    taskShowsMyDailyTime: true,
    taskShowsMyAllTime: true,
    taskShowsAllPeoplesTime: false,
    largeFonts: false,
    showDescription: true,
    listBlock: ListBlocksOpts.LIST,
  },
};

/**
 * settingsSlice
 */
const settingsSlice = createSlice({
  name: 'settingsSlice',
  initialState: settingsSliceInitialState,
  reducers: {
    updateSettings: (state, { payload: settings }: PayloadAction<Partial<SettingsInterface>>) => {
      state.settings = {
        ...state.settings,
        ...settings,
      };
    },

    /**
     * resetSettings
     *
     * @param state
     */
    resetSettings: state => {
      state.settings = settingsSliceInitialState.settings;
    },
  },
});

export const { actions: settingsSliceActions, reducer: settingsSliceReducer } = settingsSlice;
