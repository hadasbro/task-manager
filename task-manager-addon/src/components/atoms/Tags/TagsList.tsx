import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import TagEntity from '../../../models/entities/Tag';
import { selectAllTagsByKey } from '../../../store/selectors/tagsSelectors';

/**
 * TagsList
 *
 * @param tags
 * @constructor
 */
const TagsList: FC<{ tags: TagEntity['key'][] }> = ({ tags }) => {
  const allTags = useSelector(selectAllTagsByKey);

  const tagsList = useMemo(() => {
    return tags.map(t => {
      return allTags[t] ? allTags[t].name : '';
    });
  }, [allTags, tags]);

  return <span className="pd">tags: {tagsList.length ? tagsList.join(', ') : '-'}</span>;
};

export default TagsList;
