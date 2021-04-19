import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'reflect-metadata';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from 'serviceWorker';
import './locales/i18n'; // Initialize languages
import { HelmetProvider } from 'react-helmet-async';
import { App } from './components/app';
import './styles/index.css';
import { initApp } from './init/app';

export const {
  appStore,
  appDi: { StorageType, DI },
  appSettings,
} = initApp();

const MOUNT_NODE = document.getElementById('root') as HTMLElement;

const ConnectedApp = ({ Component }: { Component: typeof App }) => (
  <Provider store={appStore}>
    <HelmetProvider>
      {/* <React.StrictMode> */}
      <Component />
      {/* </React.StrictMode> */}
    </HelmetProvider>
  </Provider>
);

const render = (Component: typeof App) => {
  ReactDOM.render(<ConnectedApp Component={Component} />, MOUNT_NODE);
};

if (module.hot) {
  // Hot reloadable translation json files and app
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./components/app', './locales/i18n'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    // eslint-disable-next-line global-require,no-shadow
    const { App } = require('./components/app');
    render(App);
  });
}

render(App);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
