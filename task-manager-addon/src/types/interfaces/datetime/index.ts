import { DayjsObj } from './DayjsObj';
import { OptionalObj } from '../../templates/OptionalObj';
import { TimerActions } from '../../../init/enums/settings/TimerActions';

/**
 * OptionalDayjsObj
 */
export type OptionalDayjsObj = OptionalObj<DayjsObj>;

/**
 * OnTimerAction - play/stop actions type
 */
export type OnTimerAction = (action: TimerActions, taskId: string) => void;
