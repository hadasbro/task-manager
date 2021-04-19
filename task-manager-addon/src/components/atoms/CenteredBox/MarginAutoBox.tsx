import React, { CSSProperties, FC, ReactElement } from 'react';
import { usePaperStyles } from '../../../styles/styles/modules';

/**
 * MarginAutoBox
 *
 * @param children
 * @param cssWidth
 * @constructor
 */
const MarginAutoBox: FC<{ children: ReactElement; cssProperties?: CSSProperties }> = ({
  children,
  cssProperties = { width: '70%' },
}) => {
  const classes = usePaperStyles();
  return (
    <div className={classes.marginAutoContainer}>
      <div className={classes.marginAutoItem} style={cssProperties}>
        {children}
      </div>
    </div>
  );
};

export default MarginAutoBox;
