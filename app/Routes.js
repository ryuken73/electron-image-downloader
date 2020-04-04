import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import MainPage from './containers/MainPage';
import CounterPage from './containers/CounterPage';

export default () => (
  <App>
    <Switch>
      <Route path={routes.COUNTER} component={CounterPage} />
      <Route path={routes.HOME} component={MainPage} />
    </Switch>
  </App>
);
