import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTLineStyles } from '../../../styles/styles/modules';
import MarginAutoBox from '../../atoms/CenteredBox/MarginAutoBox';
import UserProvider from '../../molecules/UserProvider/UserProvider';
import { ActivityList } from '../../molecules/ActivitySection/ActivityList';
import { Nullable } from '../../../types/templates/Nullable';
import UserEntity from '../../../models/entities/User';
import { selectActivityFilter } from '../../../store/selectors/activitySelectors';

/**
 * ActivityTab
 *
 * @constructor
 */
const ActivityTab = () => {
  const classes2 = useTLineStyles();

  const [user, setUser] = useState<Nullable<UserEntity>>(null);

  const activityFilter = useSelector(selectActivityFilter);

  useEffect(() => {
    setUser(activityFilter.user || null);
  }, [activityFilter]);

  return (
    <MarginAutoBox cssProperties={{ width: '100%' }}>
      <div className={classes2.timelinesBox}>
        <UserProvider widthSearchBox initUser={user}>
          {({ user }) => <ActivityList user={user} />}
        </UserProvider>
      </div>
    </MarginAutoBox>
  );
};

export default ActivityTab;
