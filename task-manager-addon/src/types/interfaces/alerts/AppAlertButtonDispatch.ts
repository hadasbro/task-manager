import { AppAlertButtonTypes } from './AppAlertButtonTypes';
import { PartialObj } from '../../templates/PartialObj';

/**
 * AppAlertButtonDispatchNormal
 */
export type AppAlertButtonDispatchNormal = {
  type: Exclude<AppAlertButtonTypes, AppAlertButtonTypes.CLOSE>;
  label: string;
  actionToDispatch: any; // FIXME RootActions;
};

/**
 * AppAlertButtonDispatchClose
 */
export type AppAlertButtonDispatchClose = PartialObj<
  {
    type: AppAlertButtonTypes.CLOSE;
    actionToDispatch?: any; // FIXME RootActions;
  },
  'type'
>;

/**
 * AppAlertButtonDispatch
 */
export type AppAlertButtonDispatch = AppAlertButtonDispatchNormal | AppAlertButtonDispatchClose;
