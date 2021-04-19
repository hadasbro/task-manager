/* eslint-disable no-param-reassign */
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'store/utils/toolkit/helpers';
import { ApiConfigState } from '../state/ApiConfigState';
import { ApiClientType } from '../../../init/enums/api/ApiClientType';
import { Langs } from '../../../init/enums/general/Langs';
import { ViewKinds } from '../../../init/enums/appearance/ViewKinds';
import ApiConfigInterface from '../../../types/interfaces/objects/Config';
import { themes } from '../../../init/defaults/themes';
import { Nullable } from '../../../types/templates/Nullable';
import UserEntity from '../../../models/entities/User';

/**
 * apiConfigSliceInitialState
 */
export const apiConfigSliceInitialState: ApiConfigState = {
  apiConfig: {
    apiType: ApiClientType.JIRA,
    lang: Langs.EN,
    theme: themes.thdefaut,
    viewtype: ViewKinds.BASIC,
    apiCredentials: {
      apiUrl: '',
      apiToken: '',
      userId: '5f147bebe407a4001c69fcfe', // Sla Sla (slawek.sla.it@gmail.com)
    },
  },
  appUser: null,
};

/**
 * apiConfigSlice
 */
export const apiConfigSlice = createSlice({
  name: 'apiConfigSlice',
  initialState: apiConfigSliceInitialState,
  reducers: {
    /**
     * updateApiConfig
     *
     * @param state
     * @param action
     */
    updateApiConfig: (state, { payload: config }: PayloadAction<ApiConfigInterface>) => {
      state.apiConfig = config;
    },

    /**
     * loadAppUser
     *
     * @param state
     * @param appUser
     */
    loadAppUser: (state, { payload: user }: PayloadAction<Nullable<UserEntity>>) => {
      state.appUser = user;
    },
  },
});

export const { actions: apiConfigSliceActions, reducer: apiConfigSliceReducer } = apiConfigSlice;
