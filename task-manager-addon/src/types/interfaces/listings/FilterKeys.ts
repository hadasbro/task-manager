import FilterOrder from '../objects/FilterOrder';

/**
 * All filters in FilterOrder
 */
export type FilterKeys = Extract<
  keyof FilterOrder,
  | 'projectIdIn'
  | 'assigneeIdIs'
  | 'observerIdIs'
  | 'reporterIdIs'
  | 'typeIdIn'
  | 'priorityIdIn'
  | 'statusIdIn'
  | 'lastActivityAllSince'
  | 'lastActivityUserSince'
>[];
