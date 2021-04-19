import _ from 'lodash';
import { isDefined } from './isDefined';

/**
 * isNotEmpty
 *
 * @param value
 */
export const isNotEmpty = <T>(value: T | undefined | null): value is T => {
  if (!isDefined(value)) {
    return false;
  }
  return !_.isEmpty(value);
};
