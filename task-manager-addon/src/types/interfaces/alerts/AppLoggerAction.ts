import { AppLoggerActionAlert } from './AppLoggerActionAlert';
import { AppLoggerActionTechError } from './AppLoggerActionTechError';
import { AppLoggerActionDispatch } from './AppLoggerActionDispatch';

/**
 * AppLoggerAction
 */
export type AppLoggerAction = AppLoggerActionAlert | AppLoggerActionTechError | AppLoggerActionDispatch;
