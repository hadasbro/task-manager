import React, { FC } from 'react';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

/**
 * Desc
 *
 * @param inputLabel
 * @param titleAccess
 * @param color
 * @constructor
 */
const Desc: FC<{ inputLabel: string; titleAccess: string; color: LayoutColorsDisabled }> = ({
  inputLabel,
  titleAccess = '',
  color = 'inherit',
}) => (
  <span>
    {inputLabel}
    <ArrowDownwardIcon titleAccess={titleAccess} color={color} fontSize="small" />
  </span>
);

export default Desc;
