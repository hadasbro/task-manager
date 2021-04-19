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
 * ReminderFilters
 *
 * @constructor
 */
const ReminderFilters: FC<ListingFilterButtonsProps> = ({ filters, updateFilters }) => {
  const filterButtons = useMemo(() => {
    return {
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
          label: 'viewed',
        },
        {
          key: 'undone',
          label: 'ringing',
        },
      ],
    };
  }, []);

  return (
    <>
      <FilterGroup
        label="Remind me:"
        activeKey={filters.pinnedTd}
        buttons={filterButtons.pinned}
        handleChange={val => {
          updateFilters({
            pinnedTd: val,
          });
        }}
      />

      <FilterGroup
        label="Status:"
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

export default ReminderFilters;
