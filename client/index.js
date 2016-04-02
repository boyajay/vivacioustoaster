import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Link, browserHistory } from 'react-router';
import configureStore from './store/configureStore';
import routes from './app/routes';
import { syncHistoryWithStore } from 'react-router-redux';
import DevTools from './containers/DevTools';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <div>
    <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
      {routes}
    </Router>
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('root')
);
