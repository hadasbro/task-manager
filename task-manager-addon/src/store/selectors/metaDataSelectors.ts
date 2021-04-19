import { createSelector } from '@reduxjs/toolkit';
import { metaDataSliceInitialState } from '../redux/slices/metaDataSlice';
import { AppState } from '../redux/AppState';
import { MetaDataState } from '../redux/state/MetaDataState';

/**
 * SettingsStep TimeRange
 */
export const selectMetaData = createSelector(
  (state: AppState): MetaDataState => state.metaDataSlice || metaDataSliceInitialState,
  mt => {
    return mt.meta;
  },
);
