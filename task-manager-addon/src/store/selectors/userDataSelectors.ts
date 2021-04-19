import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../redux/AppState';
import { UserDataState } from '../redux/state/UserDataState';
import { userDataInitialState } from '../redux/slices/userDataSlice';

/**
 * selectUserData
 */
export const selectUserData = createSelector(
  (state: AppState): UserDataState => state.userDataSlice || userDataInitialState,
  ud => ud.userData,
);
