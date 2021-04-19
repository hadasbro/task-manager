import dayjs from 'dayjs';
import ObjectSupport from 'dayjs/plugin/objectSupport';
import RelativeTime from 'dayjs/plugin/relativeTime';
import dddd from 'dayjs/plugin/duration';
import ToObject from 'dayjs/plugin/toObject';
import Utc from 'dayjs/plugin/utc';
import CustomParseFormat from 'dayjs/plugin/customParseFormat';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { OptionalObj } from '../types/templates/OptionalObj';
import { Nullable } from '../types/templates/Nullable';
import { DayjsObj } from '../types/interfaces/datetime/DayjsObj';

// plugins
dayjs.extend(CustomParseFormat);
dayjs.extend(ObjectSupport);
dayjs.extend(ToObject);
dayjs.extend(RelativeTime);
dayjs.extend(dddd);
dayjs.extend(Utc);
dayjs.extend(advancedFormat);

/**
 * dayjsTZ
 */
export type dayjsTZ = 'utc' | 'default';

/**
 * Simple, temporary wrapper for dayjs with ObjectSupport
 *
 * WARNING
 * in dayjs months are counted from 0 so january is 0
 *
 * @param date
 * @param tz
 * @return dayjs.Dayjs
 */
export const dayjsExt = (date: Nullable<OptionalObj<DayjsObj> | Date> = null, tz: dayjsTZ = 'default') => {
  if (tz === 'default') {
    // @ts-ignore
    return dayjs.utc(date || new Date());
  }

  // @ts-ignore
  return dayjs(date || new Date());
};

/**
 * dayjsObj
 *
 * Simple, temporary wrapper for dayjs + ToObject
 *
 * @param date
 * @param tz
 * @return DayjsObj
 */
export const dayjsObj = (date: Nullable<OptionalObj<DayjsObj> | Date> = null, tz: dayjsTZ = 'default') => {
  return dayjsExt(date, tz).toObject();
};

/**
 * dayjsFormat
 *
 * @param date
 * @param format
 * @return dayjs.Dayjs
 *
 */
export const dayjsFormat = (date: Nullable<OptionalObj<DayjsObj>> = null, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjsExt(date).format(format);
};

/**
 * reFormatTime
 *
 * @param date
 * @param format
 */
export const reFormatTime = (date: string, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs.utc(date).format(format);
};
