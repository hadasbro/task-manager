import React, { FC, ReactNode } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import {
  AutoSizer,
  MasonryCellProps,
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry,
} from 'react-virtualized';
import Paper from '@material-ui/core/Paper';
import { useVirtualizedTableStyles } from '../../../styles/styles/tasksTable';
import * as Task from '../../atoms/Task';
import TaskTimer from '../../molecules/Task/TaskTimer';
import { selectTasksWithRelations } from '../../../store/selectors/tasksSelectors';
import { selectUserData } from '../../../store/selectors/userDataSelectors';
import { selectSettings } from '../../../store/selectors/settingsSelectors';
import { TaskActivityStatus } from '../../../init/enums/settings/TaskActivityStatus';
import { OnTimerAction } from '../../../types/interfaces/datetime';

/**
 * VirtualizedBlocksProps
 */
interface VirtualizedBlocksProps {
  onTimerAction: OnTimerAction;
}

/**
 * Single row data format
 */
interface BlockData {
  type: ReactNode;
  status: ReactNode;
  priority: ReactNode;
  name: any;
  time: any;
  link: any;
  description: any;
}

/**
 * StyledVirtualizedBlocksProps
 *
 * Virtualized blocks props (with styles props)
 */
interface StyledVirtualizedBlocksProps extends VirtualizedBlocksProps, WithStyles<typeof useVirtualizedTableStyles> {}

/**
 * VirtualizedBlocks
 *
 * @param classes
 * @param onTimerAction
 * @constructor
 */
const VirtualizedBlocks: FC<StyledVirtualizedBlocksProps> = ({ classes, onTimerAction }) => {
  const tasks = useSelector(selectTasksWithRelations);
  const userData = useSelector(selectUserData);
  const settings = useSelector(selectSettings);

  const cache: CellMeasurerCache = new CellMeasurerCache({
    defaultWidth: 425,
    fixedWidth: true,
  });

  const cellPositioner = createMasonryCellPositioner({
    cellMeasurerCache: cache,
    columnCount: 2,
    columnWidth: 425,
    spacer: 20,
  });

  const rowGetter = (index: any) => {
    const { type, status, priority, id, url, key, name, description, timeTodayUser, timeAllUser } = tasks[index];

    const taskActivityStatus =
      userData.lastActiveTask !== null && userData.lastActiveTask.task.id === id
        ? userData.lastActiveTask.status
        : TaskActivityStatus.INACTIVE;

    const dataObj: BlockData = {
      name,
      description,
      priority: <Task.Priority {...priority} />,
      type: <Task.Type {...type} />,
      link: <Task.Link url={url} label={key} />,
      status: <Task.Status {...status} />,
      time: (
        <TaskTimer
          onAction={onTimerAction}
          taskId={id}
          timeTodayUser={timeTodayUser}
          timeAllUser={timeAllUser}
          activityStatus={taskActivityStatus}
        />
      ),
    };

    return dataObj;
  };

  const cellRenderer = ({ index, key, parent, style }: MasonryCellProps) => {
    const taskData = rowGetter(index);

    return (
      <CellMeasurer cache={cache} index={index} key={key} parent={parent}>
        <div style={style} className={clsx(classes.flexContainerBlock, classes.flexContainer)}>
          <table style={{ width: '100%', tableLayout: 'fixed' }}>
            <tbody>
              <tr>
                <td colSpan={2}>
                  <p className="title">{taskData.name}</p>
                </td>
                <td>{taskData.time}</td>
              </tr>
              {settings.showDescription && !!taskData.description && (
                <tr>
                  <td colSpan={3}>
                    <div className="listTaskRowDescr">{taskData.description}</div>
                  </td>
                </tr>
              )}
              <tr>
                <td colSpan={3} className="status-block">
                  <span>{taskData.link}</span>
                  <span>{taskData.priority}</span>
                  <span>{taskData.type}</span>
                  <span>{taskData.status}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CellMeasurer>
    );
  };

  const renderKey = `${Math.random()}-${(Date.now() % 1000) / 1000}`;

  return (
    <Paper className={classes.taskListPaper}>
      <AutoSizer>
        {({ height, width }) => (
          <Masonry
            descr={+settings.showDescription}
            key={renderKey}
            autoHeight={false}
            cellCount={tasks.length}
            cellMeasurerCache={cache}
            cellPositioner={cellPositioner}
            cellRenderer={cellRenderer}
            height={height}
            width={width}
          />
        )}
      </AutoSizer>
    </Paper>
  );
};

/**
 * StyledVirtualizedBlocks
 *
 * Styled blocks
 */
const StyledVirtualizedBlocks = withStyles(useVirtualizedTableStyles)((props: StyledVirtualizedBlocksProps) => (
  <VirtualizedBlocks {...props} />
));

/**
 * TasksBlocksVirtualized
 *
 * Virtualised blocks
 *
 * @param props
 * @constructor
 */
const TasksBlocksVirtualized: FC<VirtualizedBlocksProps> = props => <StyledVirtualizedBlocks {...props} />;

export default TasksBlocksVirtualized;
