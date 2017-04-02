import React from 'react';
import {render} from 'react-dom';
import { Router, Route, indexRoute, browserHistory } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import Main from './components/main/main';
import Signup from './components/signup/signup';
import Login from './components/login/login';
import Dashboard from './components/dashboard/dashboard';
import CreateDocument from './components/documents/createDocument';
import initialState from './store/initialState'
import { Provider } from 'react-redux';
import configureStore from './store/configureStore.js'
import loggedIn from './actions/authAction';
import DocumentDetail from './components/documents/documentDetail';

let store = configureStore(initialState);

 render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main} >
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} onEnter={loggedIn} />
        <Route path="/createDocument" component={CreateDocument} onEnter={loggedIn} />
        <Route path="/documents/:id" component={DocumentDetail} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app'));