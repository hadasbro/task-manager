import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllTags } from '../../store/selectors/tagsSelectors';
import TagEntity from '../../models/entities/Tag';
import { Nullable } from '../../types/templates/Nullable';
import { tagsSliceActions } from '../../store/redux/slices/tagsSlice';

/**
 * TagEntity['key'];
 */
type Tkey = TagEntity['key'];

/**
 * TagChooserHookType
 */
type TagChooserHookType = {
  choosenTags: Tkey[];
  addOrRemoveTag: (
    tagKey: TagEntity['key'],
    source?: 'choose' | 'remove',
    handleTagsChoose?: Nullable<(tags: Tkey[]) => void>,
  ) => void;
  initChoosenTags: (tags: TagEntity['key'][]) => void;
  tagsToRemove: Tkey[];
  selectedAllTags: TagEntity[];
  removeTagsCommit: (callback?: Nullable<() => void>) => void;
  addTagsCommit: (tag: string, callback?: Nullable<() => void>) => void;
};

/**
 * useTagChooser
 *
 * @param reinit
 */
export const useTagChooser = (reinit?: boolean): TagChooserHookType => {
  const dispatch = useDispatch();

  const selectedAllTags = useSelector(selectAllTags);

  const [tagsToRemove, setTagsToRemove] = useState<TagEntity['key'][]>([]);

  const [choosenTags, setChoosenTags] = useState<TagEntity['key'][]>([]);

  useEffect(() => {
    setTagsToRemove([]);
    setChoosenTags([]);
  }, [reinit]);

  /**
   * addOrRemoveTag
   */
  const addOrRemoveTag = useCallback(
    (
      tagKey: string,
      source: 'choose' | 'remove' = 'choose',
      handleTagsChoose?: Nullable<(tags: TagEntity['key'][]) => void>,
    ) => {
      if (source === 'choose') {
        setChoosenTags(prev => {
          let tags: TagEntity['key'][];

          if (prev.includes(tagKey)) {
            tags = prev.filter(t => t !== tagKey);
          } else {
            tags = [...prev, tagKey];
          }

          if (handleTagsChoose) {
            handleTagsChoose(tags);
          }

          return tags;
        });
      } else {
        setTagsToRemove(prev => [...prev, tagKey]);
      }
    },
    [choosenTags, tagsToRemove],
  );

  /**
   * initChoosenTags
   */
  const initChoosenTags = useCallback(
    (tagKeys: TagEntity['key'][]) => {
      setChoosenTags(tagKeys);
    },
    [choosenTags, tagsToRemove],
  );

  /**
   * removeTagsCommit
   *
   * @param callback
   */
  const removeTagsCommit = useCallback(
    (callback?: Nullable<() => void>) => {
      dispatch(tagsSliceActions.removeTags(tagsToRemove));
      setTagsToRemove([]);

      if (callback) {
        callback();
      }
    },
    [choosenTags, tagsToRemove],
  );

  /**
   * addTagsCommit
   */
  const addTagsCommit = useCallback(
    (tag: string, callback?: Nullable<() => void>) => {
      try {
        dispatch(tagsSliceActions.addNewTag(tag));
      } catch (e) {
        // tag exists already (ignore, one day do better :P)
      }

      if (callback) {
        callback();
      }
    },
    [choosenTags, tagsToRemove],
  );

  return {
    tagsToRemove,
    choosenTags,
    initChoosenTags,
    addOrRemoveTag,
    selectedAllTags,
    removeTagsCommit,
    addTagsCommit,
  };
};
