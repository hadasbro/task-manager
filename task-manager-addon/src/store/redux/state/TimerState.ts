import { Dict } from '../../../types/templates/Dict';
import TodoEntity from '../../../models/entities/Todo';
import { DayjsObj } from '../../../types/interfaces/datetime/DayjsObj';
import { Nullable } from '../../../types/templates/Nullable';

/**
 * TimerState
 */
export interface TimerState {
  /**
   * Dict<[time_start, time_end], task_id>;
   * {
   *   task_id: {
   *     timer_id1: [time_start, time_end],
   *     timer_id2: [time_start, time_end]
   *   },
   *   task_id2: {
   *     timer_id1: [time_start, time_end],
   *   }
   * }
   */
  timerLogs: Dict<Dict<[DayjsObj, DayjsObj]>, TodoEntity['id']>;
  activeTimerId: Nullable<string>;
}
