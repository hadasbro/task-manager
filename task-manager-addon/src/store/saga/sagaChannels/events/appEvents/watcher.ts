import { call, take, cancelled, put, fork, all } from 'redux-saga/effects';
import { channel } from './channel';
import { AppEvent, JSEvents, UIEvents } from '../../../../../types/interfaces/events/appEvents';
import { alertSliceActions } from '../../../../redux/slices/appAlertSlice';

/**
 * panelChangeHandleEffect
 *
 * things to do when we change panel
 */
export function* panelChangeHandleEffect() {
  yield all([put(alertSliceActions.closeAlert())]);
}

/**
 * focusInOutHandleEffect
 *
 * @param type
 */
export function* focusInOutHandleEffect(type: JSEvents.WINDOW_FOCUS_IN | JSEvents.WINDOW_FOCUS_OUT) {
  yield true;
}

/**
 * appEventsChannelWatcher
 *
 * This channel contains all global app events which require some
 * general action, e.g. event of page/panel's change which for
 * example should also remove all alerts presented in the app
 */
export function* appEventsChannelWatcher() {
  const chan = yield call(channel);
  try {
    while (true) {
      const appEvent: AppEvent = yield take(chan);

      switch (appEvent.eventType) {
        case UIEvents.PANEL_CHANGE:
          yield fork(panelChangeHandleEffect);
          break;

        case JSEvents.WINDOW_FOCUS_IN:
        case JSEvents.WINDOW_FOCUS_OUT:
          yield fork(focusInOutHandleEffect, appEvent.eventType);
          break;

        default:
          break;
      }
    }
  } finally {
    if (yield cancelled()) {
      chan.close();
    }
  }
}
