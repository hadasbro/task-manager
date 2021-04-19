import React, { ComponentType, FC } from 'react';
import { Redirect, RouteProps } from 'react-router-dom';
import { Redirection } from '../../types/interfaces/routing/Redirection';

/**
 * withRedirection
 *
 * HOC for adding redirection to React Route
 *export class Route<T extends RouteProps = RouteProps> extends Component<T, any> {}

 * @param Component
 */
const withRedirection = <T extends RouteProps = RouteProps>(Component: ComponentType<T>): FC<T & Redirection> => ({
  from,
  to,
  ...routeProps
}) => {
  // @ts-ignore (one day I will actionToDispatch that better :P)
  return <Component {...routeProps} render={() => <Redirect from={from} to={to} {...routeProps} />} />;
};

export default withRedirection;
