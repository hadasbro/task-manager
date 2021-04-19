/* eslint-disable no-param-reassign */
import { createSlice } from 'store/utils/toolkit/helpers';
import { PayloadAction } from '@reduxjs/toolkit';
import { AlertState } from '../state/AlertState';
import { AppAlert } from '../../../types/interfaces/alerts/AppAlert';
import { Nullable } from '../../../types/templates/Nullable';

/**
 * alertSliceInitialState
 */
export const alertSliceInitialState: AlertState = {
  alert: null,
  dialogMsg: null,
  showDialog: false,
};

/**
 * DialogMsg
 */
export type DialogMsg = Nullable<{ title?: string; msg?: string }>;

/**
 * appAlertSlice
 */
const appAlertSlice = createSlice({
  name: 'appAlertSlice',
  initialState: alertSliceInitialState,
  reducers: {
    /**
     * pushAlert
     *
     * @param state
     * @param action
     */
    pushAlert: (state, { payload }: PayloadAction<Nullable<AppAlert>>) => {
      state.alert = payload;
    },

    /**
     * closeAlert
     *
     * @param state
     */
    closeAlert: state => {
      state.alert = null;
    },

    /**
     * showDialogMsg
     *
     * @param state
     * @param msg
     */
    showDialogMsg: (state, { payload: msg }: PayloadAction<DialogMsg>) => {
      state.dialogMsg = msg;
      state.showDialog = true;
    },

    /**
     * hideDialogMsg
     *
     * @param state
     */
    hideDialogMsg: state => {
      state.showDialog = false;
    },
  },
});

export const { actions: alertSliceActions, reducer: alertSliceReducer } = appAlertSlice;

export const { actions, reducer } = appAlertSlice;
