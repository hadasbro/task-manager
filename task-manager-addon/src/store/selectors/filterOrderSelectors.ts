import { createSelector } from '@reduxjs/toolkit';
import equal from 'fast-deep-equal/react';
import _ from 'lodash';
import { FilterOrderState } from '../redux/state/FilterOrderState';
import { filterOrderSliceInitialState } from '../redux/slices/filterOrderSlice';
import { AppState } from '../redux/AppState';
import FilterOrder from '../../types/interfaces/objects/FilterOrder';

/**
 * filterOrderSelector
 *
 * @param state
 */
const filterOrderSelector = (state: AppState): FilterOrderState =>
  state.filterOrderSlice || filterOrderSliceInitialState;

/**
 * filterOrderInitialSelector
 */
const filterOrderInitialSelector = (): FilterOrderState => filterOrderSliceInitialState;

/**
 * Filter & order selector
 */
export const selectFiltersOrder = createSelector(filterOrderSelector, ft => ft.filterOrder);

/**
 * selectChangedFiltersCount
 */
export const selectChangedFiltersCount = createSelector(
  [filterOrderSelector, filterOrderInitialSelector],
  (current, initial) =>
    _.memoize(
      (
        keysToCompare: Array<keyof FilterOrder> = [
          'projectIdIn',
          'assigneeIdIs',
          'observerIdIs',
          'reporterIdIs',
          'typeIdIn',
          'priorityIdIn',
          'statusIdIn',
          'lastActivityAllSince',
          'lastActivityUserSince',
        ],
      ) => {
        let diffCounter = 0;

        for (const [key, value] of Object.entries(current.filterOrder)) {
          if (!keysToCompare.includes(key as keyof FilterOrder)) {
            // eslint-disable-next-line no-continue
            continue;
          }

          if (!equal(value, initial.filterOrder[key])) diffCounter += 1;
        }

        return diffCounter;
      },
    ),
);

/**
 * selectChangedOrdersCount
 */
export const selectChangedOrdersCount = createSelector(
  [filterOrderSelector, filterOrderInitialSelector],
  (current, initial) => {
    return current.filterOrder.orderBy === initial.filterOrder.orderBy ? 0 : 1;
  },
);
