/* eslint-disable no-param-reassign */
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'store/utils/toolkit/helpers';
import { UserDataState } from '../state/UserDataState';
import { UserData } from '../../../types/interfaces/objects/UserData';
import { ActiveTask } from '../../../init/enums/settings/ActiveTask';
import { Nullable } from '../../../types/templates/Nullable';

/**
 * userDataInitialState
 */
export const userDataInitialState: UserDataState = {
  userData: {
    lastActiveTask: null,
  },
};

/**
 * userDataSlice
 */
const userDataSlice = createSlice({
  name: 'userDataSlice',
  initialState: userDataInitialState,
  reducers: {
    /**
     * updateUserData
     *
     * @param state
     * @param payload
     */
    updateUserData: (state, { payload: uData }: PayloadAction<UserData>) => {
      state.userData = uData;
    },

    /**
     * updateLastActiveTask
     *
     * @param state
     * @param payload
     */
    updateLastActiveTask: (state, { payload: lastTask }: PayloadAction<Nullable<ActiveTask>>) => {
      state.userData.lastActiveTask = lastTask;
    },
  },
});

export const { actions: userDataSliceActions, reducer: userDataSliceReducer } = userDataSlice;
