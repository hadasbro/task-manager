import ValidationException from '../../exceptions/system/ValidationException';
import { ListingElementData } from '../../components/organisms/ListingElementForm/ListingElementForm';

/**
 * validateReminder
 *
 * @param data
 * @param mode
 */
export const validateTodo = (data: ListingElementData, mode: 'add' | 'edit' = 'add') => {
  if (mode === 'edit' && !data.entityId) {
    throw new ValidationException('Wrong element ID. Please try again.');
  }

  if (!data.title) {
    throw new ValidationException('Wrong title or description');
  }

  return true;
};
