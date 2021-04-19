import FilterOrder from '../objects/FilterOrder';

/**
 * All order criteria in FilterOrder
 */
export type OrderKey = Extract<keyof FilterOrder, 'orderBy'>;
