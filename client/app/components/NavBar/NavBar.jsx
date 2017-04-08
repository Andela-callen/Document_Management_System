import React from 'react';
import { browserHistory, Link } from 'react-router';
import { NavItem, Dropdown, Button } from 'react-materialize';
import { connect } from 'react-redux';
import {} from '../../actions/roleAction';
import jwt from 'jsonwebtoken';

import SearchForm from '../SearchForm/searchForm';

import { getRoles } from '../../actions/roleAction.js';


export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
  }

  logOut(){
    localStorage.clear('token');
    browserHistory.push('/')
  }

  renderNavBar() {
    const token = localStorage.getItem('token');
    let isAdmin = false;
    if (this.props.user && this.props.user.roleId) {
      isAdmin = true;
    }
    

    const menu = (
      <span>
        { isAdmin ? <li><Link to="/roles">View Role</Link></li> : null }
        { isAdmin ? <li><Link to="/users">View Users</Link></li> : null}
      </span>
    );

    const unauthenticatedView = (
      <section>
        <li> <Link to="/signup"> Sign Up </Link></li>
        <li> <Link to="/login"> Login </Link></li>
      </section>
    );

    const authenticatedView = (
      <span>
        <SearchForm />
        {menu}
        <li><Link to="/createDocument">Create Document</Link></li>
        <li> <Link to="/dashboard"> Dashboard</Link></li>
        <li><a onClick={this.logOut}>Logout</a></li>
      </span>
    );

    return (
      <div>
        <nav>
          <div className="nav-wrapper light-blue darken-3">
            <Link to="/" className="brand-logo">DocumentIt!</Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              { !token ? unauthenticatedView : authenticatedView }
            </ul>
          </div>
        </nav>
      </div>
    );
  }

    render() {
      return (
        this.renderNavBar()
      )
  }
}
