import { AppLoggerAction } from '../../interfaces/alerts/AppLoggerAction';
import { AppLoggerActionAlert } from '../../interfaces/alerts/AppLoggerActionAlert';

/**
 * isAlert
 *
 * @param act
 */
export function isAlert(act: AppLoggerAction): act is AppLoggerActionAlert {
  return (act as AppLoggerActionAlert).alert !== undefined;
}
