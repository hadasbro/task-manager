import { NonEmptyArray } from '../../types/templates/NonEmptyArray';

/**
 * arrayFirstValue
 *
 * not empty array shift
 *
 * @param arrayOfElements
 */
export const arrayFirstValue = <T>(arrayOfElements: NonEmptyArray<T>) => {
  return arrayOfElements.shift() as T;
};
