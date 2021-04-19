import { EnhancedStore, CombinedState } from '@reduxjs/toolkit';
import { AppState } from '../../store/redux/AppState';
import { ApiClientType } from '../enums/api/ApiClientType';
import { Langs } from '../enums/general/Langs';
import { themes } from '../defaults/themes';
import { ViewKinds } from '../enums/appearance/ViewKinds';
import { Theme } from '../enums/appearance/Theme';

/**
 * AppConfigReturn
 *
 */
export type AppConfigReturn = { theme: Theme; viewtype: ViewKinds; lang: Langs; apiType: ApiClientType };

/**
 * initApp
 */
export function configureApp(store: EnhancedStore<CombinedState<AppState>>): AppConfigReturn {
  const state = store.getState();

  // TODO
  // configure app initial settings (client type, appearance, api etc.)

  return {
    apiType: ApiClientType.JIRA,
    lang: Langs.EN,
    theme: themes.thdefaut,
    viewtype: ViewKinds.EXTENDED,
  };
}
