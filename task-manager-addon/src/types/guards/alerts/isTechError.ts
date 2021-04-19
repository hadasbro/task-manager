import { AppLoggerAction } from '../../interfaces/alerts/AppLoggerAction';
import { AppLoggerActionTechError } from '../../interfaces/alerts/AppLoggerActionTechError';

/**
 * isTechError
 *
 * @param act
 */
export function isTechError(act: AppLoggerAction): act is AppLoggerActionTechError {
  return (act as AppLoggerActionTechError).error !== undefined;
}
