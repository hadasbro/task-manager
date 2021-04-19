import React, { FC, MouseEvent } from 'react';
import { Chip } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';

/**
 * Link
 *
 * @param url
 * @param key
 * @constructor
 */
export const Link: FC<{ url: string; label: string }> = ({ url, label }) => {
  const onClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    // eslint-disable-next-line react/jsx-no-target-blank
    <a href={url} target="_blank" onClick={onClick}>
      <Chip className="task-key-chip" icon={<LinkIcon />} label={label} size="small" color="primary" />
    </a>
  );
};
