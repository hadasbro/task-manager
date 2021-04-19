import { EntityID } from '../global/EntityID';
import { TimerActions } from '../../../init/enums/settings/TimerActions';

/**
 * TimerActionPayload
 */
export type TimerActionPayload = { taskId: EntityID; taskAction: TimerActions };
