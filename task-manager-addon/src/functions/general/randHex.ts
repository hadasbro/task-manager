import _ from 'lodash';

/**
 * randHex
 *
 * @param size
 */
export const randHex = (size: number = 20) => {
  return _.times(size, () => _.random(35).toString(36)).join('');
};
