/**
 * ActivityEntity
 */
import { EntityID } from '../../types/interfaces/global/EntityID';

export default interface ActivityEntity {
  fkey: string;
  taskId: EntityID;
  userId: EntityID;
  description: string;
  time: string;
  created: string;
  createdTimestamp: string;
  userName: string;
  avatarUrl: string;
  userLink: string;
  taskLink: string;
  taskKey: string;
  update: {
    field: string;
    fieldId: string;
    fromString: string;
    toString: string;
  };
}
