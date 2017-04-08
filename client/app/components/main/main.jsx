import React from 'react';
import { browserHistory, Link } from 'react-router';
import { Navbar, NavItem, Icon } from 'react-materialize';
import { connect } from 'react-redux';
import {} from '../../actions/roleAction';
import jwt from 'jsonwebtoken';

import { getOneUser } from '../../actions/userAction';
import { searchDocuments } from '../../actions/documentAction';
import { getRoles } from '../../actions/roleAction.js';

import NavBar from '../NavBar/NavBar';


class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    
  }

  componentDidMount () {
    var token = localStorage.getItem( "token");
    if (token){
      console.log('called');
      console.log(this.props);
      this.props.getOneUser();
    }else{
      //redirect to login
    }
  }

  render() {
    return (
      <div>
        <NavBar roles={this.props.roles} user={this.props.user} />
        {this.props.children}
      </div>
    )
  }
}

// export default Main;
const mapStateToProps = (state, ownProps) => {
  return {
    documents: state.documentReducer.documents,
    roles: state.roleReducer.roles,
    user: state.userReducer.user.user,
  }
};

const mapDispatchToProps = {
    searchDocuments,
    getRoles,
    getOneUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);