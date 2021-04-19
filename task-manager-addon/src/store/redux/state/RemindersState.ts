import { Dict } from '../../../types/templates/Dict';
import { ListingFilters } from '../../../types/interfaces/components/listings/filters';
import ReminderEntity from '../../../models/entities/Reminder';

/**
 * RemindersState
 */
export interface RemindersState {
  remindersList: Dict<ReminderEntity>;
  filters: ListingFilters;
}
