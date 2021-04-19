import React, { FC, ReactNode } from 'react';
import _ from 'lodash';

/**
 * BreakLine
 *
 * @param br
 * @constructor
 */
const BreakLine: FC<{ br?: number }> = ({ br = 1 }) => {
  const breaks: ReactNode[] = [];
  _.times(br, i => {
    breaks.push(<br key={i} />);
  });

  return <>{breaks}</>;
};

export default BreakLine;
