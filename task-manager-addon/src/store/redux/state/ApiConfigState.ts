import ApiConfigInterface from '../../../types/interfaces/objects/Config';
import { Nullable } from '../../../types/templates/Nullable';
import UserEntity from '../../../models/entities/User';

/**
 * ApiConfigState
 */
export interface ApiConfigState {
  apiConfig: ApiConfigInterface;
  appUser: Nullable<UserEntity>;
}
