import React, { FC } from 'react';
import { Avatar } from '@material-ui/core';

/**
 * UserAvatar
 *
 * @param avatarSrc
 * @param withRandThumbnail
 * @constructor
 */
const UserAvatar: FC<{ avatarSrc: string; withRandThumbnail?: boolean }> = ({
  avatarSrc,
  withRandThumbnail = true,
}) => {
  return <Avatar alt="avatar" src={avatarSrc} />;
};

export default UserAvatar;
