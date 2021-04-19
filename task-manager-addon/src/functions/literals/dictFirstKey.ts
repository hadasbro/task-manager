import _ from 'lodash';
import { Dict } from '../../types/templates/Dict';

/**
 * dictFirstKey
 *
 * not empty object keys shift
 *
 * @param dict
 */
export const dictFirstKey = <T, K extends number | string = string>(dict: Dict<T, K>) => {
  return (_.head(Object.keys(dict)) as unknown) as K;
};
