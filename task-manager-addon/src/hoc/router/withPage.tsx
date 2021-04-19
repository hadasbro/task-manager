import React, { ComponentProps, ComponentType, FC, FunctionComponent } from 'react';
import { RouteProps } from 'react-router-dom';
import LoadingWrapper from '../../components/atoms/LoadingWrapper/LoadingWrapper';
import LoadingIndicator from '../../components/atoms/LoadingIndicator/LoadingIndicator';
import { lazyLoad } from '../../utils/loadable/loadable';
import { Route } from '../../types/interfaces/routing/Route';
import { RoutePage } from '../../types/interfaces/routing/RoutePage';

/**
 * withPage
 *
 * HOC for adding Page component to React Route
 */
const withPage = <T extends RouteProps = RouteProps>(Component: ComponentType<T>): FC<T & Route> => ({
  pageData,
  ...routeProps
}) => {
  /**
   * TasksPageLazy
   */
  const PageLazy: (props: ComponentProps<FunctionComponent<RoutePage>>) => JSX.Element = lazyLoad(
    () => import(`../../components/pages/${routeProps.page}/${routeProps.page}`),
    module => module.default,
    {
      fallback: (
        <LoadingWrapper>
          <LoadingIndicator />
        </LoadingWrapper>
      ),
    },
  );

  // @ts-ignore (one day I will actionToDispatch that better :P)
  return <Component {...routeProps} component={() => <PageLazy {...pageData} />} />;
};

export default withPage;
