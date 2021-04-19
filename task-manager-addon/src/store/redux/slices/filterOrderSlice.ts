/* eslint-disable no-param-reassign */
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'store/utils/toolkit/helpers';
import { dayjsObj } from '../../../extensions/dayjs';
import { FilterOrderState } from '../state/FilterOrderState';
import { TasksOrders } from '../../../types/interfaces/listings/TasksOrders';
import FilterOrder, { UserIsFilter } from '../../../types/interfaces/objects/FilterOrder';
import { EntityID } from '../../../types/interfaces/global/EntityID';
import { defaultTimePickerDate } from '../../../init/defaults/datetime';

/**
 * filterOrderSliceInitialState
 */
export const filterOrderSliceInitialState: FilterOrderState = {
  filterOrder: {
    search: null,
    projectIdIn: [],
    assigneeIdIs: null,
    observerIdIs: null,
    reporterIdIs: null,
    typeIdIn: [],
    priorityIdIn: [],
    statusIdIn: [],
    lastActivityAllSince: dayjsObj(defaultTimePickerDate),
    lastActivityUserSince: dayjsObj(defaultTimePickerDate),
    orderBy: TasksOrders.Unspecified,
  },
};

/**
 * ToggleFilterPayload
 */
export type ToggleFilterPayload = { key: keyof UserIsFilter; val: EntityID };

/**
 * filterOrderSlice
 */
const filterOrderSlice = createSlice({
  name: 'filterOrderSlice',
  initialState: filterOrderSliceInitialState,
  reducers: {
    updateFilters: (state, { payload: newFilterOrder }: PayloadAction<Partial<FilterOrder>>) => {
      state.filterOrder = {
        ...state.filterOrder,
        ...newFilterOrder,
      };
    },

    /**
     * toggleUserFilter
     *
     * Set App's user or NULl as a reporter|assignee| observer (toggle)
     *
     * @param state
     * @param action
     */
    toggleUserFilter: (state, { payload: { key: filterKey, val: filterVal } }: PayloadAction<ToggleFilterPayload>) => {
      if (state.filterOrder[filterKey] === null) {
        state.filterOrder.reporterIdIs = null;
        state.filterOrder.assigneeIdIs = null;
        state.filterOrder.observerIdIs = null;
        state.filterOrder[filterKey] = filterVal;
      } else {
        // nullify
        state.filterOrder[filterKey] = null;
      }
    },

    /**
     * nullifyUserFilter
     *
     * @param state
     */
    nullifyUserFilter: state => {
      state.filterOrder = {
        ...state.filterOrder,
        assigneeIdIs: null,
        reporterIdIs: null,
        observerIdIs: null,
      };
    },
  },
});

export const { actions: filterOrderSliceActions, reducer: filterOrderSliceReducer } = filterOrderSlice;
