import { createSelector } from '@reduxjs/toolkit';
import { peopleInitialState } from '../redux/slices/peopleSlice';
import { AppState } from '../redux/AppState';
import { PeopleState } from '../redux/state/PeopleState';

/**
 * activitySelector
 *
 * @param state
 */
const peopleSelector = (state: AppState): PeopleState => state.peopleSlice || peopleInitialState;

/**
 * selectPeopleList
 */
export const selectPeopleList = createSelector(peopleSelector, ud => ud.peopleList);

/**
 * selectPeopleArray
 */
export const selectPeopleArray = createSelector(peopleSelector, ud => Object.values(ud.peopleList));

/**
 * selectPeopleFilter
 */
export const selectPeopleFilter = createSelector(peopleSelector, ud => ud.peopleFilter);

/**
 * selectPeopleFilteredUser
 */
export const selectPeopleFilteredUser = createSelector(peopleSelector, ud => {
  if (!ud.peopleFilter.userId) {
    return null;
  }

  if (ud.peopleList[ud.peopleFilter.userId]) {
    return ud.peopleList[ud.peopleFilter.userId];
  }

  return null;
});
