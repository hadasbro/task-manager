import { PartialObj } from '../../templates/PartialObj';
import { DayjsObj } from '../datetime/DayjsObj';
import { Nullable } from '../../templates/Nullable';

/**
 * ListingItemAddedDate
 */
export type ListingItemAddedDate = Nullable<PartialObj<DayjsObj, 'years' | 'months' | 'date'>>;

/**
 * ListingItemPinneddDate
 */
export type ListingItemPinneddDate = Nullable<PartialObj<DayjsObj, 'years' | 'months' | 'date'>>;

/**
 * ListingItemPinneddDateReminder
 */
export type ListingItemPinneddDateReminder = Nullable<
  PartialObj<DayjsObj, 'years' | 'months' | 'date' | 'hours' | 'minutes'>
>;
