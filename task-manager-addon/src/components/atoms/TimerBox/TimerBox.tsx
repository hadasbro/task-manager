import React, { FC } from 'react';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { useTimerBoxStyles } from '../../../styles/styles/modules';

/**
 * TimerBox
 * @constructor
 */
export const TimerBox: FC = () => {
  const classes = useTimerBoxStyles();

  return (
    <div className={classes.root}>
      <AccessTimeIcon fontSize="default" />
    </div>
  );
};
