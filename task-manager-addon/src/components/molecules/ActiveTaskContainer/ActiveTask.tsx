import React from 'react';
import Paper from '@material-ui/core/Paper';
import { useSelector } from 'react-redux';
import { AccessTime } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import StopIcon from '@material-ui/icons/Stop';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { useActiveTaskStyles } from '../../../styles/styles/tasks';
import { selectUserData } from '../../../store/selectors/userDataSelectors';
import { Nullable } from '../../../types/templates/Nullable';
import { ActiveTask } from '../../../init/enums/settings/ActiveTask';
import { isNotEmpty } from '../../../types/guards/general/isNotEmpty';

/**
 * ActiveTaskContainer
 *
 * @constructor
 */
const ActiveTaskContainer = () => {
  const classes = useActiveTaskStyles();
  const userData = useSelector(selectUserData);
  const activeTasks: Nullable<ActiveTask> = userData.lastActiveTask;

  return (
    <Paper className={classes.activeTaskWrapper}>
      <Grid container>
        <Grid item xs={2} className={classes.activeTaskTextBox}>
          <Grid container>
            <Grid item xs={3} className={classes.activeTaskTextBox}>
              <AccessTime fontSize="large" color="primary" />
            </Grid>
            <Grid item xs={8}>
              <Grid container>
                <Grid item xs={12}>
                  <b className={classes.activeTaskFlexText}>Working on</b>
                </Grid>
                <Grid item xs={12}>
                  {activeTasks && <span className={classes.activeTaskFlexText}>08:12:21</span>}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={9}>
          {isNotEmpty(activeTasks) ? (
            <span>
              <a
                href={activeTasks!.task.url}
                style={{
                  color: 'blue',
                  textTransform: 'uppercase',
                  marginRight: 10,
                }}
              >
                {activeTasks!.task.key}
              </a>
              {activeTasks!.task.name}
            </span>
          ) : (
            <span>No active tasks.</span>
          )}
        </Grid>
        <Grid item xs={1}>
          {activeTasks && (
            <>
              <StopIcon color="secondary" />
              <PlayArrowIcon color="disabled" />
            </>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ActiveTaskContainer;
