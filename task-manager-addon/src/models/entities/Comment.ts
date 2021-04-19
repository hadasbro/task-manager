import { EntityID } from '../../types/interfaces/global/EntityID';

/**
 * CommentEntity
 */
export default interface CommentEntity {
  id: EntityID;
  url: string;
  body: string;
  created: string;
  updated: string;
  authorName: string;
  authorUrl: string;
}
