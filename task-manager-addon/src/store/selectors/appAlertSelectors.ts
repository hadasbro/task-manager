import { createSelector } from '@reduxjs/toolkit';
import { alertSliceInitialState } from '../redux/slices/appAlertSlice';
import { AppState } from '../redux/AppState';

/**
 * selectAlert
 */
export const selectAlert = createSelector(
  (state: AppState) => state.appAlertSlice || alertSliceInitialState,
  ac => ac.alert,
);

/**
 * selectDialogVisible
 */
export const selectDialogVisible = createSelector(
  (state: AppState) => state.appAlertSlice || alertSliceInitialState,
  ts => ({
    visible: ts.showDialog,
    msg: ts.dialogMsg,
  }),
);
