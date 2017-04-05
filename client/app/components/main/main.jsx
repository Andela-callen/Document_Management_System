import React from 'react';
import { browserHistory, Link } from 'react-router';
import { Navbar, NavItem, Icon } from 'react-materialize';
import { connect } from 'react-redux';

import { searchDocuments } from '../../actions/documentAction';


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  logOut(){
    localStorage.clear('token');
    browserHistory.push('/')
  }

  componentDidMount () {
    // $(".dropdown-button").dropdown();
  }

  handleChange(event) {
    this.setState({ search: event.currentTarget.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.searchDocuments(this.state.search);
  }

  renderNavBar() {
    const token = localStorage.getItem('token');
      return (
        <div>
          <nav>
            <div className="nav-wrapper light-blue darken-3">
              <Link to="/" className="brand-logo">DocumentIt!</Link>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                { !token &&  <li> <Link to="/signup"> Sign Up </Link></li> }
                { !token &&   <li> <Link to="/login"> Login </Link></li> }
                { token &&   <li>
                  <form onSubmit={this.handleSubmit}>
                    <div className="input-field">
                      <input
                        id="search"
                        type="search"
                        value={this.state.search}
                        onChange={this.handleChange}
                        required 
                      />
                      <label htmlFor="search"><i className="material-icons">search</i></label>
                      <i className="material-icons">close</i>
                    </div>
                  </form>
                  </li>}
                { token &&  <li>
                  <ul id="dropdown1" className="dropdown-content">
                    <li><Link to="/profile">Profile</Link></li>
                    <li className="divider"></li>
                    <li><Link to="/createDocument">Create Document</Link></li>
                  </ul>
                  <ul className="right hide-on-med-and-down">
                    <li><a className="dropdown-button" data-activates="dropdown1">Dropdown<i className="material-icons right">arrow_drop_down</i></a></li>
                  </ul>
                  </li> }

                { token &&  <li> <Link to="/dashboard"> Dashboard</Link></li>}
                { token && <li><a onClick={this.logOut}><Link to ="/home">Logout</Link></a></li>}
                </ul>
            </div>
          </nav>
        </div>
      );
    }

    render() {
      return (
        <div>
        {this.renderNavBar()}
        {this.props.children}
        </div>
      )
  }
}

// export default Main;
const mapStateToProps = (state, ownProps) => {
  return {
    documents: state.documentReducer.documents,
  }
};

const mapDispatchToProps = {
    searchDocuments,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);