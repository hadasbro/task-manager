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
 * NoteFilters
 *
 * @constructor
 */
const NoteFilters: FC<ListingFilterButtonsProps> = ({ filters, updateFilters }) => {
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
    </>
  );
};

export default NoteFilters;
