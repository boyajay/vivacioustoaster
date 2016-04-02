import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../app/reducers';
import DevTools from '../containers/DevTools';
import { Router, Route, browserHistory } from 'react-router';
import { routerMiddleware, push } from 'react-router-redux';

export default function configureStore(initialState) {
  const middleware = routerMiddleware(browserHistory);
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunkMiddleware, middleware, createLogger()),
      DevTools.instrument()
    )
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
