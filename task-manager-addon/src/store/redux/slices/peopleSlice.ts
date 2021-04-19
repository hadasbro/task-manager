/* eslint-disable no-param-reassign */
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'store/utils/toolkit/helpers';
import UserEntity from '../../../models/entities/User';
import { PeopleState } from '../state/PeopleState';
import { Dict } from '../../../types/templates/Dict';
import PeopleFilter from '../../../types/interfaces/objects/PeopleFilter';

/**
 * peopleInitialState
 */
export const peopleInitialState: PeopleState = {
  peopleList: {},
  autosuggestUser: [],
  peopleFilter: {},
};

const peopleSlice = createSlice({
  name: 'peopleSlice',
  initialState: peopleInitialState,
  reducers: {
    /**
     * peopleLoad
     *
     * @param state
     * @param allPeople
     */
    peopleLoad: (state, { payload: allPeople }: PayloadAction<Dict<UserEntity>>) => {
      state.peopleList = allPeople;
    },

    /**
     * peopleFilterUpdate
     *
     * @param state
     * @param filter
     */
    peopleFilterUpdate(state, { payload: filter }: PayloadAction<PeopleFilter>) {
      state.peopleFilter = filter;
    },

    /**
     * loadUsersForAutosuggest
     *
     * @param state
     * @param suggestedPeople
     */
    loadUsersForAutosuggest: (state, { payload: suggestedPeople }: PayloadAction<UserEntity[]>) => {
      state.autosuggestUser = suggestedPeople;
    },
  },
});

export const { actions: peopleSliceActions, reducer: peopleSliceReducer } = peopleSlice;
