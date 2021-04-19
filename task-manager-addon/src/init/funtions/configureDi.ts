import { container, DependencyContainer, InjectionToken } from 'tsyringe';
import JiraStorage from '../../api/clients/jira/JiraStorage';
import { StorageKey } from '../../api/apiTypes';
import { ApiClientType } from '../enums/api/ApiClientType';
import { Langs } from '../enums/general/Langs';
import { themes } from '../defaults/themes';
import { ViewKinds } from '../enums/appearance/ViewKinds';

/**
 * ConfigureDiReturnType
 */
export type ConfigureDiReturnType = { StorageType: any; DI: DependencyContainer; storagedependencyToken: string };

/**
 * initApp
 */
export function configureDi(): ConfigureDiReturnType {
  /**
   * Dependency Injection container
   * (APIs, e.g. Jira, Backlog, Taiga, Targetprocess etc.)
   */
  const DI: DependencyContainer = container.createChildContainer();

  /* register services */
  const storagedependencyToken: InjectionToken<JiraStorage> = 'ApiStorage';

  const StorageType = JiraStorage;

  DI.reset();

  DI.register(StorageKey, {
    useValue: new JiraStorage({
      apiType: ApiClientType.JIRA,
      lang: Langs.EN,
      theme: themes.thdefaut,
      viewtype: ViewKinds.EXTENDED,
      // FIXME - to cleanup
      apiCredentials: {
        apiUrl: '',
        apiToken: '',
        userId: '',
      },
    }),
  });

  return {
    DI,
    storagedependencyToken,
    StorageType,
  };
}
