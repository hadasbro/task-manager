import React, { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { AutoSizer, Column, Table, TableCellRenderer, TableHeaderProps } from 'react-virtualized';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import { useVirtualizedTableStyles } from '../../../styles/styles/tasksTable';
import * as Task from '../../atoms/Task';
import TaskTimer from '../../molecules/Task/TaskTimer';
import { SettingsInterface } from '../../../types/interfaces/objects/Setting';
import { OnTimerAction } from '../../../types/interfaces/datetime';
import { selectTasksCount, selectTasksWithRelations } from '../../../store/selectors/tasksSelectors';
import { selectUserData } from '../../../store/selectors/userDataSelectors';
import { selectSettings } from '../../../store/selectors/settingsSelectors';
import { TaskActivityStatus } from '../../../init/enums/settings/TaskActivityStatus';

/**
 * VirtualizedListProps
 */
interface VirtualizedListProps {
  columns: ColumnData[];
  headerHeight?: number;
  onRowClick?: () => void;
  rowCount: number;
  rowGetter: (row: Row) => RowData;
  rowHeight?: number;
  settings: SettingsInterface;
}

/**
 * Columns props
 */
interface ColumnData {
  dataKey: string;
  label: string;
  numeric?: boolean;
  width: number;
}

/**
 * Single row's props
 */
interface Row {
  index: number;
}

/**
 * Single row data format
 */
interface RowData {
  type: ReactNode;
  status: ReactNode;
  priority: ReactNode;
  task: any;
  time: any;
}

/**
 * StyledVirtualizedListProps
 *
 * Virtualized blocks props (with styles props)
 */
interface StyledVirtualizedListProps extends VirtualizedListProps, WithStyles<typeof useVirtualizedTableStyles> {}

/**
 * VirtualizedList
 *
 * @param props
 * @constructor
 */
const VirtualizedList: FC<StyledVirtualizedListProps> = props => {
  const { headerHeight = 48, rowHeight = 62, onRowClick, settings, columns, classes, ...tableProps } = props;

  const getRowClassName = ({ index }: Row) => {
    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  const cellRenderer: TableCellRenderer = ({ cellData, columnIndex }) => {
    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick === null,
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={(columnIndex !== null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
      >
        {cellData}
      </TableCell>
    );
  };

  const headerRenderer = ({ label }: TableHeaderProps) => {
    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
        style={{ height: headerHeight }}
        align="center"
        variant="head"
      >
        <span>{label}</span>
      </TableCell>
    );
  };

  return (
    <Paper className={classes.taskListPaper}>
      <AutoSizer>
        {({ height, width }) => (
          <Table
            height={height}
            width={width}
            rowHeight={rowHeight!}
            gridStyle={{ direction: 'inherit' }}
            headerHeight={headerHeight!}
            className={classes.table}
            rowClassName={getRowClassName}
            {...tableProps}
          >
            {columns.map(({ dataKey, ...others }) => {
              return (
                <Column
                  key={dataKey}
                  headerRenderer={headerProps => headerRenderer({ ...headerProps })}
                  className={classes.flexContainer}
                  cellRenderer={cellRenderer}
                  dataKey={dataKey}
                  {...others}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    </Paper>
  );
};

/**
 * Styled VirtualizedTable
 */
const VirtualizedTable = withStyles(useVirtualizedTableStyles)((props: StyledVirtualizedListProps) => (
  <VirtualizedList {...props} />
));

/**
 * VirtualizedListsProps
 */
interface VirtualizedListsProps {
  onTimerAction: OnTimerAction;
}

/**
 * TasksListVirtualized
 *
 * Tasks list block
 *
 * @param props
 * @constructor
 */
const TasksListVirtualized: FC<VirtualizedListsProps> = ({ onTimerAction }) => {
  const tasks = useSelector(selectTasksWithRelations);
  const tasksCount = useSelector(selectTasksCount);
  const userData = useSelector(selectUserData);
  const settings = useSelector(selectSettings);

  const rowGetter = ({ index }: Row) => {
    const { type, status, priority, id, url, key, name, description, timeTodayUser, timeAllUser } = tasks[index];

    const taskActivityStatus =
      userData.lastActiveTask !== null && userData.lastActiveTask.task.id === id
        ? userData.lastActiveTask.status
        : TaskActivityStatus.INACTIVE;

    const dataObj: RowData = {
      type: <Task.Type {...type} />,
      status: <Task.Status {...status} />,
      priority: <Task.Priority {...priority} />,
      time: (
        <TaskTimer
          onAction={onTimerAction}
          taskId={id}
          timeTodayUser={timeTodayUser}
          timeAllUser={timeAllUser}
          activityStatus={taskActivityStatus}
        />
      ),
      task: (
        <>
          <table>
            <tbody>
              <tr>
                <td>
                  <div className="listTaskRow">
                    <Task.Link url={url} label={key} />
                    <span className="title">{name}</span>
                  </div>
                </td>
              </tr>
              {settings.showDescription && (
                <tr>
                  <td>
                    <div className="listTaskRowDescr">
                      <span>{description}</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      ),
    };

    return dataObj;
  };

  return (
    <VirtualizedTable
      settings={settings}
      rowCount={tasksCount}
      rowGetter={rowGetter}
      columns={[
        { width: 120, label: 'Priority', dataKey: 'priority' },
        { width: 120, label: 'Type', dataKey: 'type' },
        { width: 600, label: 'Task', dataKey: 'task' },
        { width: 170, label: 'Status', dataKey: 'status' },
        { width: 230, label: 'Time', dataKey: 'time' },
      ]}
    />
  );
};

export default TasksListVirtualized;
