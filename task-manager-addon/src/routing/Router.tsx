import React, { FC, useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
import { Route, Switch, useHistory } from 'react-router-dom';
import withPage from '../hoc/router/withPage';
import withRedirection from '../hoc/router/withRedirection';
import { isRoute } from '../types/guards/routing/isRoute';
import { Routes } from '../types/interfaces/routing';
import { PageChangeEventType } from '../store/saga/sagaChannels/events/appEvents/events/pageChangeEvent';
import { UIEvents } from '../types/interfaces/events/appEvents';

/**
 * Router
 *
 * @constructor
 */
const Router: FC<{ routes: Routes }> = ({ routes }) => {
  const history = useHistory();

  const [lastLocation, setLastLocation] = useState<string>('');

  useEffect(() => {
    return history.listen(location => {
      // custom JS event (change location)

      const pageChangeEvent: PageChangeEventType = new CustomEvent(UIEvents.PANEL_CHANGE, {
        detail: {
          from: lastLocation,
          to: location.pathname,
        },
      });

      // trigger (this event is being listened in appEvent channel)
      window.document.dispatchEvent(pageChangeEvent);

      setLastLocation(location.pathname);
    });
  }, [history]);

  const allRoutes = useMemo(
    () => _.map(routes, route => (isRoute(route) ? withPage(Route)(route) : withRedirection(Route)(route))),
    [routes],
  );

  return <Switch>{allRoutes}</Switch>;
};

export default Router;
