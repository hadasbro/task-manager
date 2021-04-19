import React, { FC } from 'react';
import PriorityEntity from '../../../models/entities/Priority';

/**
 * Priority element
 *
 * @param iconUrl
 * @param name
 * @constructor
 */
export const Priority: FC<Pick<PriorityEntity, 'iconUrl' | 'name'>> = ({ iconUrl, name }) => (
  <>
    <img src={iconUrl} className="icon" alt="" />
    <b>{name}</b>
  </>
);
