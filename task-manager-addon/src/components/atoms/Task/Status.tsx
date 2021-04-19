import React, { FC } from 'react';
import StatusEntity from '../../../models/entities/Status';

/**
 * Status
 *
 * @param iconUrl
 * @param name
 * @constructor
 */
export const Status: FC<Pick<StatusEntity, 'iconUrl' | 'name'>> = ({ iconUrl, name }) => (
  <>
    <img src={iconUrl} alt="" className="icon" />
    {name}
  </>
);
