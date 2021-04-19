import React, { FC, ReactElement } from 'react';
import { Box } from '@material-ui/core';

/**
 * AlignCenterBox
 *
 * @param children
 * @param width
 * @param height
 * @constructor
 */
const AlignCenterBox: FC<{ children: ReactElement; width?: number; height?: number }> = ({
  children,
  width = 400,
  height = 100,
}) => {
  return (
    <Box display="flex" width={width} height={height} alignItems="center" justifyContent="center">
      {children}
    </Box>
  );
};

export default AlignCenterBox;
