import { Dict } from '../../../types/templates/Dict';
import TodoEntity from '../../../models/entities/Todo';
import { ListingFilters } from '../../../types/interfaces/components/listings/filters';

/**
 * TodoState
 */
export interface TodoState {
  todoList: Dict<TodoEntity>;
  filters: ListingFilters;
}
