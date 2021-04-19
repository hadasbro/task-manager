/* eslint-disable no-param-reassign */
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'store/utils/toolkit/helpers';
import GeneralException from '../../../exceptions/system/GeneralException';
import { createKey } from '../../../functions/general/createKey';
import { TagsState } from '../state/TagsState';
import { defaultTags } from '../../../init/defaults/tags';

/**
 * tagsSliceInitialState
 */
export const tagsSliceInitialState: TagsState = {
  tagsList: defaultTags,
};

const tagsSlice = createSlice({
  name: 'tagsSlice',
  initialState: tagsSliceInitialState,
  reducers: {
    /**
     * addNewTag
     *
     * @param state
     * @param tag
     */
    addNewTag: (state, { payload: tag }: PayloadAction<string>) => {
      const tagKey = createKey(tag);

      const exists = state.tagsList.map(tag => tag.key).includes(tagKey);

      if (exists) {
        throw new GeneralException('Tag already exists in the database');
      }

      state.tagsList = [
        ...state.tagsList,
        {
          key: tagKey,
          name: tag,
        },
      ];
    },

    /**
     * removeTagsCommit
     *
     * @param state
     * @param tags
     */
    removeTags: (state, { payload: tags }: PayloadAction<string[]>) => {
      state.tagsList = state.tagsList.filter(tag => !tags.includes(tag.key));
    },
  },
});

export const { actions: tagsSliceActions, reducer: tagsSliceReducer } = tagsSlice;
