import { RouteKey } from './RouteKey';

/**
 * Redirection
 */
export interface Redirection extends RouteKey {
  path?: string;
  from: string;
  to: string;
  isRedirection: boolean;
  exact?: boolean;
}
