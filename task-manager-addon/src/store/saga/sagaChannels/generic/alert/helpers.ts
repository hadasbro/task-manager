import { all } from 'redux-saga/effects';
import { alertSliceActions } from 'store/redux/slices/appAlertSlice';
import { appLoggerChannel } from './channel';
import { isValidationException } from '../../../../../types/guards/alerts/isValidationException';
import { AppAlertType } from '../../../../../types/interfaces/alerts/AppAlertType';
import { AppAlertButtonTypes } from '../../../../../types/interfaces/alerts/AppAlertButtonTypes';
import { StoreException } from '../../../../../exceptions/store/StoreException';
import { isStoreException } from '../../../../../types/guards/alerts/isStoreException';

/**
 * apploggerUserAlertSuccess
 * @param msg
 */
export function* apploggerUserAlertSuccess(msg: string) {
  yield appLoggerChannel.put({
    alert: {
      type: AppAlertType.SUCCESS,
      msg,
    },
  });
}

/**
 * apploggerError
 *
 * @param log
 */
export function* apploggerError(log: Error | StoreException) {
  if (isValidationException(log) || isStoreException(log)) {
    yield appLoggerChannel.put({ alert: { type: AppAlertType.ERROR, msg: log.message } });
  } else {
    yield all([
      appLoggerChannel.put({
        alert: {
          type: AppAlertType.ERROR,
          msg: 'Unexpected Error',
          buttons: [
            {
              type: AppAlertButtonTypes.HANDLE,
              label: 'See details',
              actionToDispatch: alertSliceActions.showDialogMsg({
                title: log.message,
                msg: log.stack,
              }),
            },
            {
              type: AppAlertButtonTypes.CLOSE,
            },
          ],
        },
      }),
      appLoggerChannel.put({
        error: log,
      }),
    ]);
  }
}
