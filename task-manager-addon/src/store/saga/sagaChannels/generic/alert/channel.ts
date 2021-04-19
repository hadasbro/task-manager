import { channel, buffers } from 'redux-saga';
import { AppLoggerAction } from '../../../../../types/interfaces/alerts/AppLoggerAction';

/**
 * appLoggerChannel
 */
export const appLoggerChannel = channel<AppLoggerAction>(buffers.fixed(3));
