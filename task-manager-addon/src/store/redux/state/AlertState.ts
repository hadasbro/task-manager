import { Nullable } from '../../../types/templates/Nullable';
import { AppAlert } from '../../../types/interfaces/alerts/AppAlert';
import { DialogMsg } from '../slices/appAlertSlice';

/**
 * AlertState
 */
export type AlertState = {
  alert: Nullable<AppAlert>;
  dialogMsg: DialogMsg;
  showDialog: boolean;
};
