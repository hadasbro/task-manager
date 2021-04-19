import { AppAlertButtonDispatch } from './AppAlertButtonDispatch';
import { AppAlertType } from './AppAlertType';

/**
 * AppAlert
 */
export type AppAlertSaga = {
  type: AppAlertType;
  msg: string;
  noDefaultClose?: boolean;
  silent?: boolean;
  buttons?: AppAlertButtonDispatch[];
};
