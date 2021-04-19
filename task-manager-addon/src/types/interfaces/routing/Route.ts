import { RouteKey } from './RouteKey';
import { RoutePage } from './RoutePage';

/**
 * Route RouteProps,
 */
export interface Route extends RouteKey {
  exact?: boolean;
  sensitive?: boolean;
  strict?: boolean;
  page: string;
  isRoute: boolean;
  path?: string;
  pageData: RoutePage;
}
