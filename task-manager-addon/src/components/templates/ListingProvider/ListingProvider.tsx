import React, { FC, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { useSelector } from 'react-redux';
import { StarredType, PinnedType, MarkedDoneType } from 'types/interfaces/components/listings/attributes';
import { ListingFilters, FiltersUdateHandler } from 'types/interfaces/components/listings/filters';
import {
  SearchHandler,
  TagsUpdateHandler,
  OrderUpdateHandler,
  RenderCallback,
  OnFilterChangeHandler,
} from 'types/interfaces/components/listings/handlers';
import SearchBox from '../../atoms/SearchBox/SearchBox';
import * as MultiSelect from '../../atoms/MultiSelect/MultiSelect';
import ListingOrderMenu from '../../molecules/ListingOrderMenu/ListingOrderMenu';
import { Nullable } from '../../../types/templates/Nullable';
import { ListingOrders } from '../../../types/interfaces/listings/ListingOrders';
import { selectAllTagsAsOptions, selectAllTagsKeys } from '../../../store/selectors/tagsSelectors';
import { ListingOptions } from '../../../types/interfaces/components/listings/options';

/**
 * FilteredListProviderProps
 */
type FilteredListProviderProps = {
  children: RenderCallback;
  options?: ListingOptions;
  onFilterChange?: OnFilterChangeHandler;
  initialFilters?: ListingFilters;
};

/**
 * ListingElement
 *
 * @param options
 * @param children
 * @param onFilterChange
 * @param initFilters
 * @constructor
 */
const Listing: FC<FilteredListProviderProps> = ({ children, options, onFilterChange, initialFilters }) => {
  /**
   * get all tags from Redux
   */
  const selectedAllTagsKeys = useSelector(selectAllTagsKeys);
  const selectedTagsAsOptions = useSelector(selectAllTagsAsOptions);

  /**
   * options
   */
  const opts = options || {
    searchBox: true,
    tagsChooser: true,
    orderChooser: true,
    orderChooserAllowedOptions: [],
  };

  /**
   * onFilterChangeCallback
   */
  const onFilterChangeCallback: OnFilterChangeHandler = onFilterChange || (() => {});

  /**
   * state
   * (all filters)
   */
  const [filters, setFilters] = useState<ListingFilters>(
    initialFilters || {
      search: null,
      tags: [],
      order: ListingOrders.Unspecified,
      starred: 'all',
      pinnedTd: 'any',
      markedDone: 'any',
    },
  );

  /**
   * handleFilterUpdate
   *
   * @param filters
   */
  const handleFilterUpdate = (filters: Partial<ListingFilters>) => {
    setFilters(prev => {
      const newState = {
        ...prev,
        ...filters,
      };

      onFilterChangeCallback(prev, newState);

      return newState;
    });
  };

  /**
   * handleSearch
   *
   * actionToDispatch searchbox change
   *
   * @param search
   */
  const handleSearch = (search: Nullable<string>) => {
    handleFilterUpdate({
      search,
    });
  };

  /**
   * handleOrderChange
   *
   * @param order
   */
  const handleOrderChange = (order: ListingOrders) => {
    handleFilterUpdate({
      order,
    });
  };

  /**
   * handleTagsChange
   *
   * update tags (filter by tag)
   * if anything changed
   *
   * @param tags
   */
  const handleTagsChange = (tags: string[]) => {
    handleFilterUpdate({
      tags: tags.filter(t => selectedAllTagsKeys.includes(t)),
    });
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            {opts.searchBox && <SearchBox value={filters.search} handleSearch={handleSearch} />}
          </Grid>
          <Grid item xs={4}>
            {opts.tagsChooser && (
              <MultiSelect.TagSelect
                settings={{ placeholder: 'Tags' }}
                options={selectedTagsAsOptions}
                onChooseHandler={handleTagsChange}
                chooses={filters.tags}
              />
            )}
          </Grid>
          <Grid item xs={4}>
            {opts.orderChooser && (
              <ListingOrderMenu
                order={filters.order}
                setOrder={handleOrderChange}
                allowedOrderOptions={opts.orderChooserAllowedOptions}
              />
            )}
          </Grid>
        </Grid>

        {children(filters, handleFilterUpdate, handleSearch, handleOrderChange, handleTagsChange)}
      </Grid>
    </div>
  );
};

export { Listing };
export type {
  StarredType,
  PinnedType,
  MarkedDoneType,
  ListingFilters,
  FiltersUdateHandler,
  SearchHandler,
  OrderUpdateHandler,
  TagsUpdateHandler,
  RenderCallback,
};
