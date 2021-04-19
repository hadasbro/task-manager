import React, { FC } from 'react';
import Asc from '../../atoms/Order/Asc';
import { TasksOrders } from '../../../types/interfaces/listings/TasksOrders';

/**
 * TasksOrderLabel
 *
 * @param orderType
 * @param current
 * @constructor
 */
const TasksOrderLabel: FC<{ orderType: TasksOrders; current?: TasksOrders | null }> = ({
  orderType,
  current = null,
}) => {
  const color = (expected: TasksOrders) => {
    return expected === current ? 'primary' : 'inherit';
  };

  switch (orderType) {
    case TasksOrders.LastActivityAsc:
      return <Asc inputLabel="Last activity" titleAccess="oldest first" color={color(TasksOrders.LastActivityAsc)} />;

    case TasksOrders.LastActivityDesc:
      return <Asc inputLabel="Last activity" titleAccess="newest first" color={color(TasksOrders.LastActivityDesc)} />;

    case TasksOrders.MyLastActivityAsc:
      return <Asc inputLabel="My activity" titleAccess="oldest first" color={color(TasksOrders.MyLastActivityAsc)} />;

    case TasksOrders.MyLastActivityDesc:
      return <Asc inputLabel="My activity" titleAccess="newest first" color={color(TasksOrders.MyLastActivityDesc)} />;

    case TasksOrders.PriorityAsc:
      return <Asc inputLabel="Priority" titleAccess="lowest first" color={color(TasksOrders.PriorityAsc)} />;

    case TasksOrders.PriorityDesc:
      return <Asc inputLabel="Priority" titleAccess="highest first" color={color(TasksOrders.PriorityDesc)} />;

    case TasksOrders.Unspecified:
    default:
      return <>Unspecified</>;
  }
};

export default TasksOrderLabel;
