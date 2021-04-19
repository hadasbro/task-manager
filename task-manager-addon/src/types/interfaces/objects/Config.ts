import { Theme } from '../../../init/enums/appearance/Theme';
import { ApiClientType } from '../../../init/enums/api/ApiClientType';
import { Langs } from '../../../init/enums/general/Langs';
import { ViewKinds } from '../../../init/enums/appearance/ViewKinds';
import { EntityID } from '../global/EntityID';

/**
 * ApiConfigInterface
 */
export default interface ApiConfigInterface {
  apiType: ApiClientType;
  lang: Langs;
  theme: Theme;
  viewtype: ViewKinds;
  apiCredentials: {
    apiUrl: string;
    apiToken: string;
    userId: EntityID;
  };
}
