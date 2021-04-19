import React, { ChangeEvent, FC, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import PeopleTab from '../../organisms/ActivityTabs/PeopleTab';
import { useGrayBoxStyles, useTimelineStyles } from '../../../styles/styles/modules';
import WorklogTab from '../../organisms/ActivityTabs/WorklogTab';
import ActivityTab from '../../organisms/ActivityTabs/ActivityTab';
import TabPanel from '../TabPanel/TabPanel';

/**
 * ActivityModule
 *
 * @constructor
 */
const ActivityModule: FC = () => {
  const classes = useGrayBoxStyles();

  const tlclasses = useTimelineStyles();

  const theme = useTheme();

  const [value, setValue] = useState(0);

  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <Paper elevation={1} className={tlclasses.shadhowedPaper}>
      <div className={clsx(classes.root, classes.tabsPanel)}>
        <Tabs value={value} indicatorColor="primary" textColor="primary" onChange={handleChange} centered>
          <Tab label="Activity" />
          <Tab label="Logged time" />
          <Tab label="People" />
        </Tabs>

        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <ActivityTab />
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            <WorklogTab />
          </TabPanel>

          <TabPanel value={value} index={2} dir={theme.direction}>
            <PeopleTab />
          </TabPanel>
        </SwipeableViews>
      </div>
    </Paper>
  );
};

export default ActivityModule;
