import { Redirection } from '../../interfaces/routing/Redirection';
import { Route } from '../../interfaces/routing/Route';

/**
 * isRedirection type guard
 *
 * @param route
 */
export const isRedirection = (route: Redirection | Route): route is Redirection => {
  return (route as Redirection).isRedirection !== undefined;
};
