import _ from 'lodash';
import { Dict } from '../../types/templates/Dict';

/**
 * dictFirstValue
 *
 * not empty object values shift
 *
 * @param dict
 */
export const dictFirstValue = <T, K extends number | string = string>(dict: Dict<T, K>) => {
  return (_.head(Object.values(dict)) as unknown) as T;
};
