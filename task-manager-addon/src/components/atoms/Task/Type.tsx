import React, { FC } from 'react';
import TypeEntity from '../../../models/entities/Type';

/**
 * Type
 *
 * @param iconUrl
 * @param name
 * @constructor
 */
export const Type: FC<Pick<TypeEntity, 'iconUrl' | 'name'>> = ({ iconUrl, name }) => (
  <>
    <img src={iconUrl} alt="" className="icon" />
    {name}
  </>
);
