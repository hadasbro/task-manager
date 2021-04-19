import { EntityID } from '../../types/interfaces/global/EntityID';

/**
 * UserEntity
 */
export default interface UserEntity {
  accountId: EntityID;
  active: boolean;
  avatarUrl: string;
  displayName: string;
  emailAddress: string;
  accountType: string;
  url: string;
}
