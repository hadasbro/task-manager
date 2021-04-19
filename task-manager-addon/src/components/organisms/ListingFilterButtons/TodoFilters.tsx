import React, { FC, useMemo } from 'react';
import FilterGroup from '../../molecules/FilterGroup/FilterGroup';
import { FiltersUdateHandler, ListingFilters } from '../../templates/ListingProvider/ListingProvider';

/**
 * ListingFilterButtonsProps
 */
type ListingFilterButtonsProps = {
  filters: ListingFilters;
  updateFilters: FiltersUdateHandler;
};

/**
 * TodoFilters
 *
 * @constructor
 */
const TodoFilters: FC<ListingFilterButtonsProps> = ({ filters, updateFilters }) => {
  const filterButtons = useMemo(() => {
    return {
      starred: [
        {
          key: 'all',
          label: 'all',
        },
        {
          key: 'star',
          label: 'starred',
        },
      ],
      pinned: [
        {
          key: 'any',
          label: 'any',
        },
        {
          key: 'today',
          label: 'today',
        },
      ],
      markedas: [
        {
          key: 'any',
          label: 'any',
        },
        {
          key: 'done',
          label: 'done',
        },
        {
          key: 'undone',
          label: 'undone',
        },
      ],
    };
  }, []);

  return (
    <>
      <FilterGroup
        label="Show:"
        activeKey={filters.starred}
        buttons={filterButtons.starred}
        handleChange={val => {
          updateFilters({
            starred: val,
          });
        }}
      />

      <FilterGroup
        label="Pinned to:"
        activeKey={filters.pinnedTd}
        buttons={filterButtons.pinned}
        handleChange={val => {
          updateFilters({
            pinnedTd: val,
          });
        }}
      />

      <FilterGroup
        label="Marked as:"
        activeKey={filters.markedDone}
        buttons={filterButtons.markedas}
        handleChange={val => {
          updateFilters({
            markedDone: val,
          });
        }}
      />
    </>
  );
};

export default TodoFilters;
