import { EntityID } from '../../types/interfaces/global/EntityID';
import { Dict } from '../../types/templates/Dict';
import { ListingElement } from '../../types/interfaces/listings/ListingElement';
import { ListingElementData } from '../../components/organisms/ListingElementForm/ListingElementForm';
import { elementHasStar } from '../../types/guards/todo/elementHasStar';
import { elementHasDescription } from '../../types/guards/todo/elementHasDescription';
import { elementIsPinned } from '../../types/guards/todo/elementIsPinned';
import { elementHasTags } from '../../types/guards/todo/elementHasTags';

/**
 * listingElementToFormData
 *
 * @param elemId
 * @param all
 */
export const listingElementToFormData = (elemId: EntityID, all: Dict<ListingElement>) => {
  if (!elemId || !all[elemId]) {
    return null;
  }

  const el = all[elemId];

  const initFormEl: ListingElementData = {
    entityId: el.id,
    done: el.done,
    title: el.title,
    star: elementHasStar(el) ? el.star : false,
    description: elementHasDescription(el) ? el.description : '',
    pinned: elementIsPinned(el) ? el.pinned : null,
    tags: elementHasTags(el) ? el.tags : [],
  };

  return initFormEl;
};
