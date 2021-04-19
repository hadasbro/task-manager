/* eslint-disable func-names */
import { PayloadAction } from '@reduxjs/toolkit';
import { call, takeLatest, takeEvery, take, takeMaybe, takeLeading, throttle, debounce } from 'redux-saga/effects';
import { isNotEmpty } from '../../../../types/guards/general/isNotEmpty';
import { ActionEffect, isWatcherTypeExtended, WatchArg, WatcherEffect, WatcherType } from './types';
import { Dict } from '../../../../types/templates/Dict';

/**
 * config
 */
const config = {
  defaultThrottleMs: 500,
  defaultDebounceeMs: 500,
};
/**
 * createSagaWithAction
 *
 * Create watchers for saga
 *
 * @param watcher
 * @param actionType
 * @param actionEffect
 */
export const createActionWatcher = (
  watcher: WatchArg,
  actionType: string,
  actionEffect: ActionEffect<PayloadAction<any>>,
): WatcherEffect => {
  const emptyEffect = function* () {
    yield call(() => {});
  };

  if (!isNotEmpty(watcher)) {
    return emptyEffect;
  }

  let watcherType: WatcherType;

  let watcherParams: Dict<any>;

  if (isWatcherTypeExtended(watcher)) {
    watcherType = watcher.watcher;
    watcherParams = watcher.params;
  } else {
    watcherType = watcher;
    watcherParams = [];
  }

  try {
    switch (watcherType) {
      case WatcherType.TAKE:
        return function* () {
          const action = yield take(actionType);
          yield call(actionEffect, action);
        };

      case WatcherType.TAKE_WHILE:
        return function* () {
          while (true) {
            const action = yield take(actionType);
            yield call(actionEffect, action);
          }
        };

      case WatcherType.TAKE_LATEST:
        return function* () {
          yield takeLatest(actionType, actionEffect);
        };

      case WatcherType.TAKE_MAYBE:
        return function* () {
          const action = yield takeMaybe(actionType);
          yield call(actionEffect, action);
        };

      case WatcherType.TAKE_LEADING:
        return function* () {
          yield takeLeading(actionType, actionEffect);
        };

      case WatcherType.THROTTLE:
        return function* () {
          yield throttle(watcherParams.ms || config.defaultThrottleMs, actionType, actionEffect);
        };

      case WatcherType.DEBOUNCE:
        return function* () {
          yield debounce(watcherParams.ms || config.defaultDebounceeMs, actionType, actionEffect);
        };

      case WatcherType.TAKE_EVERY:
      default:
        return function* () {
          yield takeEvery(actionType, actionEffect);
        };
    }
  } catch (err) {
    console.error(`Initialising watcher failed [${actionType}] [${err}]`);
    return emptyEffect;
  }
};
