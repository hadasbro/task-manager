import { createSelector } from '@reduxjs/toolkit';
import { tagsSliceInitialState } from '../redux/slices/tagsSlice';
import { Option } from '../../components/atoms/MultiSelect/MultiSelect';
import { AppState } from '../redux/AppState';
import { TagsState } from '../redux/state/TagsState';

/**
 * tagsSelector
 *
 * @param state
 */
const tagsSelector = (state: AppState): TagsState => state.tagsSlice || tagsSliceInitialState;

/**
 * selectAllTags
 */
export const selectAllTags = createSelector(tagsSelector, ts => ts.tagsList);

/**
 * selectAllTagsByKey
 */
export const selectAllTagsByKey = createSelector(tagsSelector, ts => {
  return ts.tagsList.reduce((acc, tag) => {
    return {
      ...acc,
      [tag.key]: tag,
    };
  }, {});
});

/**
 * selectAllTagsAsOptions
 */
export const selectAllTagsAsOptions = createSelector(tagsSelector, ts => {
  return ts.tagsList.map(tag => {
    return {
      label: tag.name,
      value: tag.key,
      uniqueKey: tag.key,
    } as Option;
  });
});

/**
 * selectAllTagsKeys
 */
export const selectAllTagsKeys = createSelector(tagsSelector, ts => ts.tagsList.map(tag => tag.key));
