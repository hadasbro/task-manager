import FilterOrder from '../objects/FilterOrder';

/**
 * All search criteria in FilterOrder
 */
export type SearchKey = Extract<keyof FilterOrder, 'search'>;
