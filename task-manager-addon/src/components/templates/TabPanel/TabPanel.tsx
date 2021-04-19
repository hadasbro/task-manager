import React, { FC, ReactNode } from 'react';
import Box from '@material-ui/core/Box';

/**
 * TabPanelProps
 */
interface TabPanelProps {
  children?: ReactNode;
  dir?: string;
  index: any;
  value: any;
}

/**
 * TabPanel
 * @param children
 * @param value
 * @param index
 * @param other
 * @constructor
 */
const TabPanel: FC<TabPanelProps> = ({ children, value, index, ...other }) => {
  // FIXME
  // <Typography>{children}</Typography>

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

export default TabPanel;
