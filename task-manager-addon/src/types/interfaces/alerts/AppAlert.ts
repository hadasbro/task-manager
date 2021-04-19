import { AppAlertType } from './AppAlertType';
import { AppAlertButton } from './AppAlertButton';

/**
 * AppAlert
 */
export type AppAlert = {
  type: AppAlertType;
  msg: string;
  silent?: boolean;
  buttons?: AppAlertButton[];
};
