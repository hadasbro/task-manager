/* eslint-disable no-param-reassign */
import { createSlice } from 'store/utils/toolkit/helpers';
import { PayloadAction } from '@reduxjs/toolkit';
import ProjectEntity from '../../../models/entities/Project';
import StatusEntity from '../../../models/entities/Status';
import PriorityEntity from '../../../models/entities/Priority';
import { MetaDataState } from '../state/MetaDataState';
import { Dict } from '../../../types/templates/Dict';

/**
 * metaDataSliceInitialState
 */
export const metaDataSliceInitialState: MetaDataState = {
  meta: {
    projects: {},
    types: {},
    priorities: {},
    statuses: {},
  },
};

/**
 * metaDataSlice
 */
const metaDataSlice = createSlice({
  name: 'metaDataSlice',
  initialState: metaDataSliceInitialState,
  reducers: {
    /**
     * projectsLoad
     *
     * @param state
     * @param projects
     */
    projectsLoad: (state, { payload: projects }: PayloadAction<Dict<ProjectEntity>>) => {
      state.meta.projects = projects;
    },

    /**
     * typesLoad
     *
     * @param state
     * @param types
     */
    typesLoad: (state, { payload: types }: PayloadAction<any>) => {
      state.meta.types = types;
    },

    /**
     * prioritiesLoad
     *
     * @param state
     * @param priorities
     */
    prioritiesLoad: (state, { payload: priorities }: PayloadAction<Dict<PriorityEntity>>) => {
      state.meta.priorities = priorities;
    },

    /**
     * statusesLoad
     *
     * @param state
     * @param statuses
     */
    statusesLoad: (state, { payload: statuses }: PayloadAction<Dict<StatusEntity>>) => {
      state.meta.statuses = statuses;
    },
  },
});

export const { actions: metaDataSliceActions, reducer: metaDataSliceReducer } = metaDataSlice;
