import { Dict } from '../../../types/templates/Dict';
import UserEntity from '../../../models/entities/User';
import PeopleFilter from '../../../types/interfaces/objects/PeopleFilter';

/**
 * PeopleState
 */
export interface PeopleState {
  peopleList: Dict<UserEntity>;
  autosuggestUser: UserEntity[];
  peopleFilter: PeopleFilter;
}
