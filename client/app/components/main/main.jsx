import React from 'react';
import { browserHistory, Link } from 'react-router';


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
  }

  logOut(){
    localStorage.clear('token');
    browserHistory.push('/')
  }

  componentDidMount () {
    $(".dropdown-button").dropdown();
  }

  render() {
    return (
      <div>
        <div>
          <nav>
            <div className="nav-wrapper  light-blue darken-3">
              <Link to="/" className="brand-logo">DocumentIt!</Link>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>
                  <form>
                    <div className="input-field">
                      <input id="search" type="search" required />
                      <label htmlFor="search"><i className="material-icons">search</i></label>
                      <i className="material-icons">close</i>
                    </div>
                  </form>
                </li>
                <li>
                  <ul id="dropdown1" className="dropdown-content">
                    <li><Link to="/profile">Profile</Link></li>
                    <li className="divider"></li>
                    <li><Link to="/createDocument">Create Document</Link></li>
                  </ul>
                  <ul className="right hide-on-med-and-down">
                    <li><a className="dropdown-button" data-activates="dropdown1">Dropdown<i className="material-icons right">arrow_drop_down</i></a></li>
                  </ul>

                </li>
                <li><Link to="/profile">Profile</Link></li>
                <li><a onClick={this.logOut}><Link to ="/home">Logout</Link></a></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Signup</Link></li>
              </ul>
            </div>
          </nav>

        </div>
        {this.props.children}
      </div>
    );
  }
}

export default Main;