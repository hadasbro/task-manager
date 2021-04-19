import React, { FC } from 'react';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

/**
 * Asc
 *
 * @param inputLabel
 * @param titleAccess
 * @param color
 * @constructor
 */
const Asc: FC<{ inputLabel: string; titleAccess: string; color: LayoutColorsDisabled }> = ({
  inputLabel,
  titleAccess = '',
  color = 'inherit',
}) => (
  <span>
    {inputLabel}
    <ArrowUpwardIcon titleAccess={titleAccess} color={color} fontSize="small" />
  </span>
);

export default Asc;
