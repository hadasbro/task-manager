import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../redux/AppState';
import { apiConfigSliceInitialState } from '../redux/slices/apiConfigSlice';

/**
 * selectConfig
 */
export const selectConfig = createSelector(
  (state: AppState) => state.apiConfigSlice || apiConfigSliceInitialState,
  ac => ac.apiConfig,
);

/**
 * selectConfigUser
 */
export const selectConfigUser = createSelector(
  (state: AppState) => state.apiConfigSlice || apiConfigSliceInitialState,
  ac => ac.appUser,
);
