import { AppLoggerAction } from '../../interfaces/alerts/AppLoggerAction';
import { AppLoggerActionDispatch } from '../../interfaces/alerts/AppLoggerActionDispatch';

/**
 * isActionDispatch
 *
 * @param act
 */
export function isActionDispatch(act: AppLoggerAction): act is AppLoggerActionDispatch {
  return (act as AppLoggerActionDispatch).actionToDispatch !== undefined;
}
