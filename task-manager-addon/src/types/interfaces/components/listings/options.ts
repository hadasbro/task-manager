import { ListingOrders } from '../../listings/ListingOrders';

/**
 * ListingOptions
 */
export type ListingOptions = {
  searchBox: boolean;
  tagsChooser: boolean;
  orderChooser: boolean;
  orderChooserAllowedOptions?: ListingOrders[];
};
