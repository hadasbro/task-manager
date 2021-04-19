/* eslint-disable spaced-comment,react-hooks/exhaustive-deps */
import React, { FC, memo } from 'react';
import equal from 'fast-deep-equal/react';
import Typography from '@material-ui/core/Typography';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineContent from '@material-ui/lab/TimelineContent';
import Paper from '@material-ui/core/Paper';
import UserAvatar from '../UserAvatar/UserAvatar';
import { dayjsFormat, reFormatTime } from '../../../extensions/dayjs';
import { WorklogUser } from '../../../types/interfaces/selecttors/worklog';
import { useTLineStyles } from '../../../styles/styles/modules';

type WorklogsProps = {
  worklog: WorklogUser[];
};

/**
 * UserSearchBox
 *
 * @constructor
 */
const Worklogs: FC<WorklogsProps> = ({ worklog }) => {
  const classes2 = useTLineStyles();

  return (
    <>
      <div className={classes2.scrollBox}>
        {worklog.length === 0 ? (
          <Typography variant="body2" color="textSecondary" className="uname" align="center">
            Nothing to show.
          </Typography>
        ) : (
          <Timeline align="left" className={classes2.timeline}>
            {worklog.map(wl => {
              return (
                <TimelineItem key={wl.userId}>
                  <TimelineOppositeContent>
                    <Typography variant="body2" color="textSecondary" className="uname">
                      {wl.userName}
                    </Typography>
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <UserAvatar avatarSrc={wl.worklogs[0].avatarUrl!} />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Paper elevation={3} className={classes2.paper}>
                      {wl.worklogs.length > 0 &&
                        wl.worklogs.map(singleWorkLog => (
                          <p key={singleWorkLog.worklogId}>
                            <a href={singleWorkLog.taskLink} target="_blank" rel="noreferrer">
                              {`${singleWorkLog.taskKey.toUpperCase()} `}
                            </a>
                            <span>{dayjsFormat({ seconds: singleWorkLog.timeSpentSeconds }, 'HH:mm')}</span>
                            <br />
                            <i>{reFormatTime(singleWorkLog.time)}</i>
                          </p>
                        ))}
                    </Paper>
                  </TimelineContent>
                </TimelineItem>
              );
            })}
          </Timeline>
        )}
      </div>
    </>
  );
};

/**
 * ActivityList
 */
export const WorklogListing = memo(
  (props: WorklogsProps) => <Worklogs {...props} />,
  (prev, next) => equal(prev.worklog, next.worklog),
);
