import React, { FC, memo, useEffect } from 'react';
import equal from 'fast-deep-equal/react';
import _ from 'lodash';
import { updateActivityFilterSagaAction } from 'store/saga/actionEffects/activity/updateActivityFilterSaga';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { useTLineStyles } from '../../../styles/styles/modules';
import { selectActivityListGroupedByTask } from '../../../store/selectors/activitySelectors';
import JustifiedBox from '../../atoms/CenteredBox/JustifiedBox';
import ActivityRecord from '../../atoms/ActivityRecord/ActivityRecords';
import { ActivityFilter } from '../../../types/interfaces/objects/ActivityFilter';
import { usePager } from '../../../hooks/switchers/usePager';

/**
 * ActivityList
 *
 * @constructor
 */
const ActivityModule: FC<ActivityFilter> = ({ user }) => {
  const dispatch = useDispatch();

  const activity = useSelector(selectActivityListGroupedByTask);

  const classes2 = useTLineStyles();

  const [page, nextAvaileble, setPage, setNextAvaileble] = usePager();

  useEffect(() => {
    dispatch(updateActivityFilterSagaAction({ user, page }));
  }, [user, page]);

  return (
    <>
      <div className={classes2.scrollBox}>
        {_.isEmpty(activity) ? (
          <Typography variant="body2" color="textSecondary" className="uname" align="center">
            Nothing to show.
          </Typography>
        ) : (
          Object.entries(activity).map(([taskId, taskActivity]) => {
            return (
              <Timeline align="left" className={classes2.timeline} key={taskId}>
                {taskActivity.map(record => {
                  const dotColor = _.sample(['inherit', 'primary', 'secondary', 'grey']) as LayoutColorsExtended;
                  return (
                    <TimelineItem key={record.fkey}>
                      <TimelineOppositeContent>
                        <Typography variant="body2" color="textSecondary">
                          {record.time}
                        </Typography>
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineDot color={dotColor} />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <Paper elevation={3} className={classes2.paper}>
                          <ActivityRecord {...record} />
                        </Paper>
                      </TimelineContent>
                    </TimelineItem>
                  );
                })}
              </Timeline>
            );
          })
        )}
      </div>

      {!_.isEmpty(activity) && (
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
export const ActivityList = memo(
  (props: ActivityFilter) => <ActivityModule {...props} />,
  (prev, next) => {
    return equal(prev.user, next.user);
  },
);
