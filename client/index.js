import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory, Route} from 'react-router';
import routes from './routes';
import { Provider } from 'react-redux';
// import Signup from './app/component/signup/signup.jsx';
import Home from './app/component/home/home.jsx';
import configureStore from '../client/app/store/configureStore';
import initialState from './app/store/initialState';
import Login from './app/component/login/login';
let store = configureStore(initialState);

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Home}>
        <indexRoute component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app'));



