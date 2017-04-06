import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { signupEvent } from '../../actions/userAction'
import { Input, Button, Row, Col, Icon } from 'react-materialize'
import { getRoles } from '../../actions/roleAction'

class Roles extends React.Component {
  constructor(props) {
    super(props);
    this.props.getRoles();
  }

  // componentDidMount() {
  //   this.props.getRoles();
  // }

  render() {
    const mappedRoles = this.props.roles.map(role =>
      <div key={role.id} className="card">
        <h2>{role.title}</h2>
        <div></div>
      </div>
    );
    console.log(mappedRoles);
    return (
      <div>
        {mappedRoles}
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    roles: state.roleReducer.roles,
    pagination: state.roleReducer.pagination,
  }
}

const actionsToDispatch = (dispatch) => {
  return {
    getRoles: () => dispatch(getRoles())
  };
}
export default connect (stateToProps, actionsToDispatch)(Roles);