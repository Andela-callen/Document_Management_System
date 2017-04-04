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
// import { createStore, applyMiddleware, compose } from 'redux';
import configureStore from './store/configureStore.js';
// import './styles/style.scss'; // Webpack can import CSS files too!
// import '../../node_modules/materialize-css/dist/js/materialize.min';
// import '../../node_modules/materialize-css/dist/css/materialize.min.css';
// import '../../node_modules/material-icons/css/material-icons.css';
// import '../../node_modules/toastr/build/toastr.min.css';
// import '../../node_modules/sweetalert/dist/sweetalert.css';
import loggedIn from './actions/authAction';
import DocumentDetail from './components/documents/documentDetail';

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
      <Route path="/" component={Main} >
      <IndexRedirect to ="/login"/>
        <Route path="/signup" component={Signup} onEnter={onEnter}  />
        <Route path="/login" component={Login} onEnter={onEnter} />
        <Route path="/dashboard" component={Dashboard} onEnter={onEnter} />
        <Route path="/createDocument" component={CreateDocument} onEnter={onEnter} />
        <Route path="/documents/:id" component={DocumentDetail} onEnter={onEnter} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app'));