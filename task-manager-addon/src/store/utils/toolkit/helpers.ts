import { createSlice as createSliceOriginal, SliceCaseReducers, CreateSliceOptions } from '@reduxjs/toolkit';
import { AppState } from '../../redux/AppState';

/**
 * RootStateKeyType
 */
export type RootStateKeyType = keyof AppState;

/**
 * createSlice
 * Wrap createSlice with stricter Name options
 *
 * @param options
 */
export const createSlice = <
  State extends AppState[keyof AppState],
  CaseReducers extends SliceCaseReducers<State>,
  Name extends RootStateKeyType
>(
  options: CreateSliceOptions<State, CaseReducers, Name>,
) => createSliceOriginal(options);
