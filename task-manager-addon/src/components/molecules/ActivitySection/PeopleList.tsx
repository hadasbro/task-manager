/* eslint-disable spaced-comment */
import React, { FC, memo, useEffect } from 'react';
import equal from 'fast-deep-equal/react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { updatePeopleFilterSagaAction } from 'store/saga/actionEffects/people/updatePeopleFilterSaga';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { useTLineStyles } from '../../../styles/styles/modules';
import JustifiedBox from '../../atoms/CenteredBox/JustifiedBox';
import { selectPeopleArray } from '../../../store/selectors/peopleSelectors';
import UserAvatar from '../../atoms/UserAvatar/UserAvatar';
import UserFilter from '../../../types/interfaces/objects/UserFilter';
import { isNotEmpty } from '../../../types/guards/general/isNotEmpty';
import { usePager } from '../../../hooks/switchers/usePager';

/**
 * PeopleList
 *
 * @param user
 * @constructor
 */
const PeopleModule: FC<UserFilter> = ({ user }) => {
  const dispatch = useDispatch();

  const people = useSelector(selectPeopleArray);

  const classes = useTLineStyles();

  const [page, nextAvaileble, setPage, setNextAvaileble] = usePager();

  useEffect(() => {
    const filter = isNotEmpty(user) ? { userId: user!.accountId, page } : { userId: '', page };
    dispatch(updatePeopleFilterSagaAction(filter));
  }, [user]);

  return people.length === 0 ? (
    <Typography variant="body2" color="textSecondary" className="uname" align="center">
      Nothing to show.
    </Typography>
  ) : (
    <>
      <div className={classes.scrollBox}>
        <List className={classes.activityPeopleRoot}>
          {people.map(person => {
            return (
              <div key={person.accountId}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <UserAvatar avatarSrc={person.avatarUrl} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={person.displayName}
                    secondary={
                      <>
                        <Typography component="span" variant="caption" className={classes.inline} color="textPrimary">
                          {person.emailAddress || 'no email'}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </div>
            );
          })}
        </List>
      </div>

      {people.length !== 0 && (
        <JustifiedBox cssProperties={{ marginTop: '20px' }}>
          <div className={classes.pager}>
            <Button variant="outlined" disabled color="default">
              {page}
            </Button>

            {page > 1 && (
              <Button variant="outlined" color="default">
                Previous
              </Button>
            )}

            {nextAvaileble && (
              <Button variant="contained" color="primary">
                Next
              </Button>
            )}
          </div>
        </JustifiedBox>
      )}
    </>
  );
};

/**
 * ActivityList
 */
export const PeopleList = memo(
  (props: UserFilter) => <PeopleModule {...props} />,
  (prev, next) => equal(prev.user, next.user),
);
