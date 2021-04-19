import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTLineStyles } from '../../../styles/styles/modules';
import MarginAutoBox from '../../atoms/CenteredBox/MarginAutoBox';
import UserProvider from '../../molecules/UserProvider/UserProvider';
import DateProvider from '../../molecules/DateProvider/DateProvider';
import { WorklogList } from '../../molecules/ActivitySection/WorkloadList';
import { Nullable } from '../../../types/templates/Nullable';
import UserEntity from '../../../models/entities/User';
import { selectWorklogFilter, selectWorklogListUsersGrByUserArray } from '../../../store/selectors/activitySelectors';
import { OptionalDayjsObj } from '../../../types/interfaces/datetime';

/**
 * WorklogTab
 *
 * @constructor
 */
const WorklogTab = () => {
  const classes2 = useTLineStyles();

  const [user, setUser] = useState<Nullable<UserEntity>>(null);
  const [date, setDate] = useState<Nullable<OptionalDayjsObj>>(null);

  const wlFilter = useSelector(selectWorklogFilter);

  useEffect(() => {
    setUser(wlFilter.user || null);
    setDate(wlFilter.date || null);
  }, [wlFilter]);

  return (
    <MarginAutoBox cssProperties={{ width: '100%' }}>
      <div className={classes2.timelinesBox}>
        <DateProvider withPicker initDate={date}>
          {({ date }) => (
            <UserProvider widthSearchBox initUser={user}>
              {({ user }) => <WorklogList user={user} date={date} />}
            </UserProvider>
          )}
        </DateProvider>
      </div>
    </MarginAutoBox>
  );
};

export default WorklogTab;
