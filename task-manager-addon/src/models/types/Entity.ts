import { Dict } from '../../types/templates/Dict';
import { EntityID } from '../../types/interfaces/global/EntityID';

/**
 * Entity - abstraction for entities
 */
export abstract class Entity {
  public abstract getUniqueId(): EntityID;

  public abstract asLiteral(): Dict<any>;
}
