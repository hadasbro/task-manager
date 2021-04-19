import ProjectEntity from '../../../models/entities/Project';
import TypeEntity from '../../../models/entities/Type';
import PriorityEntity from '../../../models/entities/Priority';
import StatusEntity from '../../../models/entities/Status';
import { Dict } from '../../templates/Dict';

/**
 * Meta
 */
export default interface Meta {
  projects: Dict<ProjectEntity>;
  types: Dict<TypeEntity>;
  priorities: Dict<PriorityEntity>;
  statuses: Dict<StatusEntity>;
}
