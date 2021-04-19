/* eslint-disable no-param-reassign */
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'store/utils/toolkit/helpers';
import { LoadingState } from '../state/LoadingState';

/**
 * LSPayload
 */
type LSPayload<T extends keyof LoadingState> = PayloadAction<Partial<LoadingState[T]>>;

/**
 * loadingSliceInitialState
 */
export const loadingSliceInitialState: LoadingState = {
  meta: {
    metaLoading: false,
    metaError: null,
    projectsLoading: false,
    projectsError: null,
    typesLoading: false,
    typesError: null,
    prioritiesLoading: false,
    prioritiesError: null,
    statusesLoading: false,
    statusesError: null,
  },

  people: {
    peopleLoading: false,
    peopleError: null,
  },

  activity: {
    worklogListLoading: false,
    worklogListError: null,
    activityListLoading: false,
    activityListError: null,
  },

  settings: {
    updateSettingsLoading: false,
    updateSettingsError: null,
  },

  tasks: {
    tasksListLoading: false,
    tasksListError: null,
    currentTaskLoading: false,
    currentTaskError: null,
  },
};

/**
 * loadingSlice
 */
const loadingSlice = createSlice({
  name: 'loadingSlice',
  initialState: loadingSliceInitialState,
  reducers: {
    /**
     * setlStateMeta
     *
     * @param state
     * @param lState
     */
    setlStateMeta: (state, { payload: lState }: LSPayload<'meta'>) => {
      state.meta = { ...state.meta, ...lState };
    },

    /**
     * setlStatePeople
     *
     * @param state
     * @param lState
     */
    setlStatePeople: (state, { payload: lState }: LSPayload<'people'>) => {
      state.people = { ...state.people, ...lState };
    },

    /**
     * setlStateActivity
     *
     * @param state
     * @param lState
     */
    setlStateActivity: (state, { payload: lState }: LSPayload<'activity'>) => {
      state.activity = { ...state.activity, ...lState };
    },

    /**
     * setlStateSettings
     *
     * @param state
     * @param lState
     */
    setlStateSettings: (state, { payload: lState }: LSPayload<'settings'>) => {
      state.settings = { ...state.settings, ...lState };
    },

    /**
     * setlStateTasks
     *
     * @param state
     * @param lState
     */
    setlStateTasks: (state, { payload: lState }: LSPayload<'tasks'>) => {
      state.tasks = { ...state.tasks, ...lState };
    },
  },
});

export const { actions: loadingSliceActions, reducer: loadingSliceReducer } = loadingSlice;
