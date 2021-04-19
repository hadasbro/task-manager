import { ConfigureEnhancersCallback, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { StoreEnhancer } from 'redux';
import { rootReducer, sliceInitialState } from './redux/rootReducer';
import { rootSaga } from './saga/rootSaga';

/**
 * configureAppStore
 */
export function configureAppStore() {
  const sagaMiddleware = createSagaMiddleware({});

  const middlewares = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

  const allEnhancers: StoreEnhancer[] | ConfigureEnhancersCallback = [];

  const enableDevTools: boolean = process.env.NODE_ENV !== 'production' || process.env.PUBLIC_URL.length > 0;

  const store = configureStore({
    middleware: middlewares,
    preloadedState: sliceInitialState,
    reducer: rootReducer,
    enhancers: allEnhancers,
    devTools: enableDevTools,
  });

  // saga new stnd
  sagaMiddleware.run(rootSaga);

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./redux/rootReducer', () => {});
    // eslint-disable-next-line global-require
    store.replaceReducer(require('./redux/rootReducer').rootReducer);
  }

  return store;
}
