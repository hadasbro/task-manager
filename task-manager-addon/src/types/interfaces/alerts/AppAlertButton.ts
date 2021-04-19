import { AnyAction } from 'redux';
import { AppAlertButtonTypes } from './AppAlertButtonTypes';
import { Nullable } from '../../templates/Nullable';

/**
 * AppAlertButtonAny
 */
export type AppAlertButtonAny = {
  type: Exclude<AppAlertButtonTypes, AppAlertButtonTypes.CLOSE>;
  label: string;
  actionToDispatch: Nullable<AnyAction>;
};

/**
 * AppAlertButtonClose
 */
export type AppAlertButtonClose = {
  type: AppAlertButtonTypes.CLOSE;
};

/**
 * AppAlertButton
 */
export type AppAlertButton = AppAlertButtonAny | AppAlertButtonClose;
