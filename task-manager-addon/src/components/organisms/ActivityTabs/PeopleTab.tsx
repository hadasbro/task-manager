import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { useTLineStyles } from '../../../styles/styles/modules';
import MarginAutoBox from '../../atoms/CenteredBox/MarginAutoBox';
import UserProvider from '../../molecules/UserProvider/UserProvider';
import { PeopleList } from '../../molecules/ActivitySection/PeopleList';
import { Nullable } from '../../../types/templates/Nullable';
import UserEntity from '../../../models/entities/User';
import { selectPeopleFilteredUser } from '../../../store/selectors/peopleSelectors';

/**
 * PeopleTab
 *
 * @constructor
 */
const PeopleTab = () => {
  const classes = useTLineStyles();

  const [user, setUser] = useState<Nullable<UserEntity>>(null);

  const filteredUser = useSelector(selectPeopleFilteredUser);

  useEffect(() => {
    setUser(filteredUser);
  }, [filteredUser]);

  return (
    <MarginAutoBox cssProperties={{ width: '100%' }}>
      <div className={classes.timelinesBox}>
        <Typography variant="h5" gutterBottom>
          People
        </Typography>
        <UserProvider widthSearchBox initUser={user}>
          {({ user }) => <PeopleList user={user} />}
        </UserProvider>
      </div>
    </MarginAutoBox>
  );
};

export default PeopleTab;
