import voca from 'voca';
import _ from 'lodash';
import { dayjsObj } from '../../extensions/dayjs';

/**
 * parseTimePickerValue
 *
 * Convert time from timepicker to DaysObject
 *
 * @param value
 * @throws Error
 */
export const parseTimePickerValue = (value: string) => {
  const hourMinute = new RegExp('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$');

  const msg = 'Incorrect input, expecrted hour/minute format is HH:mm e.g. 05:00 or 5:00';

  if (!hourMinute.test(value)) {
    throw Error(msg);
  }

  const parts: string[] = value
    .split(/:|(\DM)/)
    .filter(Boolean)
    .map(part => voca.trimLeft(part, '0'))
    .map(part => _.toInteger(part).toString()); // FIXME

  if (parts.length !== 2) {
    throw Error(msg);
  }

  // TODO - to verify
  return dayjsObj({
    hours: _.toInteger(parts[0]),
    minutes: _.toInteger(parts[1]),
  });
};
