import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import Main from './components/main/main';
import Signup from './components/signup/signup';
import Login from './components/login/login';
import Dashboard from './components/dashboard/dashboard';
import CreateDocument from './components/documents/createDocument';
import initialState from './store/initialState'
import { Provider } from 'react-redux';
import configureStore from './store/configureStore.js';
import loggedIn from './actions/authAction';
import DocumentDetail from './components/documents/documentDetail';
import Roles from './components/management/roles';
import Users  from './components/management/users';
import '../styles/styles.scss';
require('font-awesome/css/font-awesome.css');// Require Editor JS files.
require("froala-editor/js/froala_editor.pkgd.min.js");
// // Require Editor CSS files.
require("froala-editor/css/froala_style.min.css");
require("froala-editor/css/froala_editor.pkgd.min.css");

let store = configureStore();
const onEnter = (next, replace, cb) => {
   const token = localStorage.getItem('token');
  if(!token && next.location.pathname.indexOf('dashboard') > -1) {
    replace('/login');
  }
  if(token && (next.location.pathname.indexOf('login') > -1 || next.location.pathname.indexOf('signup') > -1)) {
    replace('/dashboard');
  }
  cb();
}

 render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/login" component={Login} onEnter={onEnter} />
      <Route path="/signup" component={Signup} onEnter={onEnter}  />
      <Route path="/" component={Main} >
        <Route path="/dashboard" component={Dashboard} onEnter={onEnter} />
        <Route path="/createDocument" component={CreateDocument} onEnter={onEnter} />
        <Route path="/documents/:id" component={DocumentDetail} onEnter={onEnter} />
        <Route path="/roles" component={Roles} onEnter={onEnter} />
        <Route path="/users" component={Users} onEnter={onEnter} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app'));