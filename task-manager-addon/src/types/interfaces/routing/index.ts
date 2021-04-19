import { Route } from './Route';
import { Redirection } from './Redirection';
import { Dict } from '../../templates/Dict';

/**
 * RouteOrRedirection
 */
export type RouteOrRedirection = Route | Redirection;

/**
 * Routes
 */
export type Routes = Dict<RouteOrRedirection>;
