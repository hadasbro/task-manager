import React, { CSSProperties, FC, ReactElement } from 'react';
import { usePaperStyles } from '../../../styles/styles/modules';

/**
 * JustifiedBox
 *
 * @param children
 * @constructor
 */
const JustifiedBox: FC<{ children: ReactElement; cssProperties?: CSSProperties }> = ({ children, cssProperties }) => {
  const classes = usePaperStyles();
  return (
    <div className={classes.alignItemsAndJustifyContent} style={cssProperties}>
      {children}
    </div>
  );
};

export default JustifiedBox;
