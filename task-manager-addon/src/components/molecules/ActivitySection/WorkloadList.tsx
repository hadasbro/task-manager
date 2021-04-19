/* eslint-disable spaced-comment */
import React, { FC, memo, useEffect } from 'react';
import equal from 'fast-deep-equal/react';
import Button from '@material-ui/core/Button';
import { updateWorklogFilterSagaAction } from 'store/saga/actionEffects/activity/updateWorklogFilterSaga';
import { useDispatch, useSelector } from 'react-redux';
import { useTLineStyles } from '../../../styles/styles/modules';
import { selectWorklogListUsersGrByUserArray } from '../../../store/selectors/activitySelectors';
import JustifiedBox from '../../atoms/CenteredBox/JustifiedBox';
import { WorklogFilter } from '../../../types/interfaces/objects/WorklogFilter';
import { usePager } from '../../../hooks/switchers/usePager';
import { WorklogListing } from '../../atoms/WorklogList/WorklogListing';

/**
 * WorklogListing
 *
 * @param user
 * @param date
 * @constructor
 */
const WorklogModule: FC<WorklogFilter> = ({ user, date }) => {
  const dispatch = useDispatch();

  const worklog = useSelector(selectWorklogListUsersGrByUserArray);

  const classes2 = useTLineStyles();

  const [page, nextAvaileble, setPage, setNextAvaileble] = usePager();

  useEffect(() => {
    dispatch(updateWorklogFilterSagaAction({ user, date, page }));
  }, [user, date, page]);

  return (
    <>
      <WorklogListing worklog={worklog} />

      {worklog.length > 0 && (
        <JustifiedBox cssProperties={{ marginTop: '20px' }}>
          <div className={classes2.pager}>
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
export const WorklogList = memo(
  (props: WorklogFilter) => <WorklogModule {...props} />,
  (prev, next) => equal(prev.user, next.user) && equal(prev.date, next.date),
);
