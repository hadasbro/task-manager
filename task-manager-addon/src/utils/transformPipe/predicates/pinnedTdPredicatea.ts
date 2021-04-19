/* eslint-disable dot-notation */
import _ from 'lodash';
import equal from 'fast-deep-equal/react';
import { ListingElement as Elem } from '../../../types/interfaces/listings/ListingElement';
import { ListingFilters as Filters } from '../../../components/templates/ListingProvider/ListingProvider';
import { dayjsObj } from '../../../extensions/dayjs';
import { elementIsPinned } from '../../../types/guards/todo/elementIsPinned';

/**
 * pinnedTdPredicate
 *
 * check if element is pinned to today
 *
 * @param pinnedTd
 */
export const pinnedTdPredicate = <T extends Elem>(pinnedTd: Filters['pinnedTd']) => (el: T) => {
  if (!elementIsPinned(el)) {
    return true;
  }

  if (pinnedTd !== 'today') {
    return true;
  }

  if (!el.pinned) {
    return false;
  }
  const today = _.pick(dayjsObj(), ['years', 'months', 'date']);
  const pinnedDay = _.pick(el.pinned, ['years', 'months', 'date']);

  return el.pinned && equal(today, pinnedDay);
};
