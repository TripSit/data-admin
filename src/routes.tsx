import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages';
import NotFoundPage from './pages/not-found';

const Routes: FC = function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default Routes;
