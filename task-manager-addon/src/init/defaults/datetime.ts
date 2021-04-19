import { DayjsObj } from '../../types/interfaces/datetime/DayjsObj';

/**
 * defaultTimePickerDate
 *
 * default date-time for time pickers
 * (e.g. break times and others)
 */
export const defaultTimePickerDate: DayjsObj = {
  years: 1970,
  months: 1,
  date: 1,
  hours: 1,
  minutes: 1,
  seconds: 0,
  milliseconds: 0,
};

export const testTimePickerDate: DayjsObj = {
  years: 1970,
  months: 5,
  date: 7,
  hours: 12,
  minutes: 33,
  seconds: 0,
  milliseconds: 0,
};
