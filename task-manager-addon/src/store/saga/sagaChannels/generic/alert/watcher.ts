import { fork, put, spawn, take } from 'redux-saga/effects';
import { Channel } from 'redux-saga';
import { AppLoggerAction } from '../../../../../types/interfaces/alerts/AppLoggerAction';
import { isTechError } from '../../../../../types/guards/alerts/isTechError';
import { isAlert } from '../../../../../types/guards/alerts/isAlert';
import { AppAlertButtonTypes as Btype } from '../../../../../types/interfaces/alerts/AppAlertButtonTypes';
import { alertSliceActions } from '../../../../redux/slices/appAlertSlice';
import { AppAlert } from '../../../../../types/interfaces/alerts/AppAlert';
import { isActionDispatch } from '../../../../../types/guards/alerts/isActionDispatch';
import { appLoggerChannel } from './channel';
import { RootActions } from '../../../../redux/rootReducer';
import { AppLoggerActionDispatch } from '../../../../../types/interfaces/alerts/AppLoggerActionDispatch';
import { StoreException } from '../../../../../exceptions/store/StoreException';

/**
 * sendAnonymousError
 *
 * anonymously send error to the server
 *
 * @param error
 */
export function* sendAnonymousError(error: Error | StoreException | string) {
  console.error('[ ANONYMOUS ERROR ]', error);
  yield null;
}

/**
 * applogerDispatch
 *
 * @param action
 */
export function* applogerDispatch(action: RootActions) {
  yield appLoggerChannel.put({ actionToDispatch: action } as AppLoggerActionDispatch);
}

/**
 * handleApploggerAction
 *
 * @param channel
 */
function* handleApploggerAction(channel: Channel<AppLoggerAction>) {
  while (true) {
    const action: AppLoggerAction = yield take(channel);

    if (isTechError(action)) {
      yield spawn(sendAnonymousError, action.error);
    }

    if (isAlert(action)) {
      // prepare buttons and create button handlers

      const buttons = action.alert.buttons
        ? action.alert.buttons?.map(btn => {
            if (btn.type === Btype.CLOSE) {
              return {
                type: btn.type,
                label: '',
                actionToDispatch: null,
              };
            }

            return {
              ...btn,
            };
          })
        : [];

      const appAlert: AppAlert = { ...action.alert, buttons };

      yield put(alertSliceActions.pushAlert(appAlert));
    }

    if (isActionDispatch(action)) {
      yield put(action.actionToDispatch);
    }
  }
}

/**
 * appLoggerWatcher
 */
export function* appLoggerWatcher() {
  for (let i = 0; i < 3; i += 1) {
    yield fork(handleApploggerAction, appLoggerChannel);
  }
}
