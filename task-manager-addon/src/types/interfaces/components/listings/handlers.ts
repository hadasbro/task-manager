import { ReactNode } from 'react';
import { Nullable } from '../../../templates/Nullable';
import { ListingOrders } from '../../listings/ListingOrders';
import { FiltersUdateHandler, ListingFilters } from './filters';

/**
 * SearchHandler
 */
export type SearchHandler = (search: Nullable<string>) => void;

/**
 * OrderUpdateHandler
 */
export type OrderUpdateHandler = (order: ListingOrders) => void;

/**
 * TagsUpdateHandler
 */
export type TagsUpdateHandler = (tags: string[]) => void;

/**
 * OnFilterChangeHandler
 */
export type OnFilterChangeHandler = (oldFilters: ListingFilters, newFilters: ListingFilters) => void;

/**
 * RenderCallback
 */
export type RenderCallback = (
  filters: ListingFilters,
  updateFilters: FiltersUdateHandler,
  updateSearch: SearchHandler,
  updateOrder: OrderUpdateHandler,
  updateTags: TagsUpdateHandler,
) => ReactNode;
