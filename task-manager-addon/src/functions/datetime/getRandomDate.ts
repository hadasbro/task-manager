import _ from 'lodash';
import { dayjsObj } from '../../extensions/dayjs';
import { Nullable } from '../../types/templates/Nullable';
import { DayjsObj } from '../../types/interfaces/datetime/DayjsObj';

/**
 * getRandomDate
 *
 * @param inclNull
 * @param olderThanNow
 */
export const getRandomDate = (inclNull = false, olderThanNow = false): Nullable<DayjsObj> => {
  const tr = Math.floor(Math.random() * 10) % 3;

  if (inclNull && tr === 1) {
    return null;
  }

  if (tr === 0) {
    return dayjsObj(); // today
  }

  const dateNow = new Date();
  const monthNow = dateNow.getMonth();
  const dayNow = dateNow.getMonth();
  const yearNow = dateNow.getFullYear();

  return dayjsObj({
    years: yearNow,
    months: olderThanNow ? _.random(0, monthNow) : _.random(0, 11),
    date: olderThanNow ? _.random(0, dayNow) : _.random(0, 28),
  });
};
