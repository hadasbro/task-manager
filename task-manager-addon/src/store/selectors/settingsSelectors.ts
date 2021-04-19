import { createSelector } from '@reduxjs/toolkit';
import { settingsSliceInitialState } from '../redux/slices/settingsSlice';
import { AppState } from '../redux/AppState';
import { SettingsState } from '../redux/state/SettingsState';

/**
 * SettingsStep TimeRange
 */
export const selectSettings = createSelector(
  (state: AppState): SettingsState => state.settingsSlice || settingsSliceInitialState,
  st => {
    return st.settings;
  },
);
