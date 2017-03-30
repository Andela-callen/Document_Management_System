import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './app/app.js';
import Home from './app/component/home/home.jsx';
import Signup from './app/component/signup/signup.jsx';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="signup" component={Signup} />
  </Route>
);