/* eslint-disable react/destructuring-assignment,react/no-unused-prop-types */
import React, { MouseEvent } from 'react';
import clsx from 'clsx';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { toggleUserFilterSagaAction } from 'store/saga/actionEffects/tasks/toggleUserFilterSaga';
import { nullifyUserFilterSagaAction } from 'store/saga/actionEffects/tasks/nullifyUserFilterSaga';
import { startStopTimerSagaAction } from 'store/saga/actionEffects/timer/startStopTimerSaga';
import { useTodoTableStyles } from '../../../styles/styles/tasksTable';
import TasksBlocksVirtualized from '../../organisms/TaskLists/TasksBlocks';
import TasksListVirtualized from '../../organisms/TaskLists/TasksLists';
import { selectTasksCount } from '../../../store/selectors/tasksSelectors';
import { selectSettings } from '../../../store/selectors/settingsSelectors';
import { selectFiltersOrder } from '../../../store/selectors/filterOrderSelectors';
import { selectConfig } from '../../../store/selectors/apiConfigSelectors';
import FilterOrder from '../../../types/interfaces/objects/FilterOrder';
import { TimerActions } from '../../../init/enums/settings/TimerActions';
import { ListBlocksOpts } from '../../../init/enums/settings/ListBlocksOpts';

/**
 * TodoListComponent
 *
 * Main Tasks List Component
 * (wrapper for tasksList, scroll up button, bottom filters)
 *
 * @constructor
 */
const TasksContainer = () => {
  const dispatch = useDispatch();

  const tasksCount = useSelector(selectTasksCount);
  const settings = useSelector(selectSettings);
  const filters = useSelector(selectFiltersOrder);
  const config = useSelector(selectConfig);

  const classes = useTodoTableStyles();

  const handleBottomFilter = ({
    currentTarget: { name },
  }: MouseEvent<HTMLButtonElement> & {
    currentTarget: { name: keyof FilterOrder & 'any' };
  }) => {
    if (name === 'any') {
      dispatch(nullifyUserFilterSagaAction());
    } else {
      dispatch(
        toggleUserFilterSagaAction({
          key: name,
          val: config.apiCredentials.userId,
        }),
      );
    }
  };

  /**
   * onTimerAction - TODO
   *
   * @param taskAction
   * @param taskId
   */
  const onTimerAction = (taskAction: TimerActions, taskId: string) => {
    dispatch(
      startStopTimerSagaAction({
        taskId,
        taskAction,
      }),
    );
  };

  return (
    <div className={classes.todoRoot}>
      <Fab color="secondary" size="small" className={classes.fab}>
        <ExpandLessIcon />
      </Fab>

      <Grid container>
        <Grid item xs={12}>
          <div
            className={clsx(classes.flexContainerNormal, {
              [classes.flexContainerLargeFonts]: settings.largeFonts,
            })}
          >
            {settings.listBlock === ListBlocksOpts.BLOCK ? (
              <TasksBlocksVirtualized onTimerAction={onTimerAction} />
            ) : (
              <TasksListVirtualized onTimerAction={onTimerAction} />
            )}
          </div>
        </Grid>
        <Grid item xs={3}>
          <div
            className={clsx(classes.todoBottomFilters, {
              [classes.sortButtonLargeFont]: settings.largeFonts,
            })}
            style={{ margin: 15, textAlign: 'left' }}
          >
            Items on the list: <b>{tasksCount}</b>
          </div>
        </Grid>
        <Grid item xs={9}>
          <div
            className={clsx(classes.todoBottomFilters, classes.sortButton, {
              [classes.sortButtonLargeFont]: settings.largeFonts,
            })}
          >
            <p>Show only tasks where I am:</p>

            <Button
              size="small"
              disableElevation
              variant="contained"
              name="any"
              onClick={handleBottomFilter}
              {...(!(filters.assigneeIdIs || filters.reporterIdIs || filters.observerIdIs) && {
                color: 'primary',
              })}
            >
              any
            </Button>

            <Button
              size="small"
              disableElevation
              variant="contained"
              name="assigneeIdIs"
              onClick={handleBottomFilter}
              {...(filters.assigneeIdIs && { color: 'primary' })}
            >
              asignee
            </Button>

            <Button
              size="small"
              disableElevation
              variant="contained"
              name="reporterIdIs"
              onClick={handleBottomFilter}
              {...(filters.reporterIdIs && { color: 'primary' })}
            >
              reporter
            </Button>

            <Button
              size="small"
              disableElevation
              variant="contained"
              name="observerIdIs"
              onClick={handleBottomFilter}
              {...(filters.observerIdIs && { color: 'primary' })}
            >
              observer
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default TasksContainer;
