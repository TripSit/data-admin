import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages';

import DrugListingPage from './pages/drug';
import DrugDetailsPage from './pages/drug/details';

import UserListingPage from './pages/user';
import UserDetailsPage from './pages/user/details';

import NotFoundPage from './pages/not-found';

const Routes: FC = function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />

      <Route exact path="/drugs" component={DrugListingPage} />
      <Route exact path="/drugs/:drugId" component={DrugDetailsPage} />

      <Route exact path="/users" component={UserListingPage} />
      <Route exact path="/user/:userId" component={UserDetailsPage} />

      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default Routes;
