import { Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import { combineReducers } from '@reduxjs/toolkit';
import { AppState } from './AppState';
import { alertSliceReducer } from './slices/appAlertSlice';
import { apiConfigSliceReducer } from './slices/apiConfigSlice';
import { filterOrderSliceReducer } from './slices/filterOrderSlice';
import { metaDataSliceReducer } from './slices/metaDataSlice';
import { settingsSliceReducer } from './slices/settingsSlice';
import { tasksSliceReducer } from './slices/tasksSlice';
import { activitySliceReducer } from './slices/activitySlice';
import { userDataSliceReducer } from './slices/userDataSlice';
import { peopleSliceReducer } from './slices/peopleSlice';
import { remindersSliceReducer } from './slices/remindersSlice';
import { notesSliceReducer } from './slices/notesSlice';
import { todosSliceReducer } from './slices/todoSlice';
import { tagsSliceReducer } from './slices/tagsSlice';
import { loadingSliceReducer } from './general/loadingStateSlice';
import { timerSliceReducer } from './slices/timerSlice';

/**
 * All reducers from all slices combined
 */
export const rootReducer = combineReducers<AppState>({
  appAlertSlice: alertSliceReducer,
  apiConfigSlice: apiConfigSliceReducer,
  filterOrderSlice: filterOrderSliceReducer,
  metaDataSlice: metaDataSliceReducer,
  settingsSlice: settingsSliceReducer,
  tasksSlice: tasksSliceReducer,
  activitySlice: activitySliceReducer,
  userDataSlice: userDataSliceReducer,
  peopleSlice: peopleSliceReducer,
  todoSlice: todosSliceReducer,
  tagsSlice: tagsSliceReducer,
  remindersSlice: remindersSliceReducer,
  notesSlice: notesSliceReducer,
  loadingSlice: loadingSliceReducer,
  timerSlice: timerSliceReducer,
});
/**
 * initialState - TODO
 */
export const sliceInitialState = undefined;

/**
 * RootActions
 */
export type RootActions = Parameters<typeof rootReducer>[1];

/**
 * AppDispatch
 */
export type AppDispatch = Dispatch<RootActions>;

/**
 * useAppDispatch
 *
 * enhanced useDispatch()
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();
