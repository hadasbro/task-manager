import { Redirection } from '../../interfaces/routing/Redirection';
import { Route } from '../../interfaces/routing/Route';

/**
 * isRoute type guard
 *
 * @param route
 */
export const isRoute = (route: Redirection | Route): route is Route => {
  return (route as Route).isRoute !== undefined;
};
