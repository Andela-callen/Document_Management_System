import React from 'react';
import { browserHistory, Link } from 'react-router';
import { Navbar, NavItem, Icon } from 'react-materialize';
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

  // componentDidMount() {
  //   $(".dropdown-button").dropdown();
  // }

  logOut(){
    localStorage.clear('token');
    browserHistory.push('/')
  }

  renderNavBar() {
    const token = localStorage.getItem('token');
    const userRoleId = Number(localStorage.getItem('userRoleId'));
    let isAdmin = false;
    const adminRole = this.props.roles.filter(role => role.title === 'Admin')[0];
    if (adminRole && userRoleId === adminRole.id) {
      isAdmin = true;
    }


    const menu = (
      <li>
        <ul id="dropdown1" className="dropdown-content">
          <li><Link to="/profile">Profile</Link></li>
          <li className="divider"></li>
          <li><Link to="/createDocument">Create Document</Link></li>
          { isAdmin ? <li><Link to="#">Create Role</Link></li> : null}
        </ul>
        <ul className="right hide-on-med-and-down">
          <li><a className="dropdown-button" data-activates="dropdown1">Dropdown<i className="material-icons right">arrow_drop_down</i></a></li>
        </ul>
      </li>
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
