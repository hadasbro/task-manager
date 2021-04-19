import { EnhancedStore, Middleware } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';
import { SagaMiddleware } from 'redux-saga';
import { configureAppStore } from '../store/store';
import { AppConfigReturn, configureApp } from './funtions/configureApp';
import { AppState } from '../store/redux/AppState';
import { configureDi, ConfigureDiReturnType } from './funtions/configureDi';

type InitAppType = {
  appStore: EnhancedStore<
    { readonly '[$CombinedState]'?: undefined } & AppState,
    AnyAction,
    (Middleware<{}, any> | SagaMiddleware<object>)[]
  >;
  appSettings: AppConfigReturn;
  appDi: ConfigureDiReturnType;
};

/**
 * initApp
 */
export function initApp(): InitAppType {
  const appStore = configureAppStore();

  const appSettings = configureApp(appStore);

  const appDi = configureDi();

  return {
    appStore,
    appSettings,
    appDi,
  };
}
