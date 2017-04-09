import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { signupEvent } from '../../actions/userAction'
import { Input, Button, Row, Col, Icon } from 'react-materialize'
import { getRoles } from '../../actions/roleAction'

class Roles extends React.Component {

  componentWillMount() {
    this.props.getRoles();
  }

  render() {

    return(

    <table className="striped">
        <thead>
          <tr>
              <th>Role Title</th>
          </tr>
        </thead>

        <tbody>
          { this.props.roles.map(role => {
          return (
            <tr key={role.id}>

              <td>{role.title}</td>
              <td>
              <i className="material-icons">mode_edit</i>
              <i className="material-icons">delete</i>
              </td>
            </tr>
          )
        })}
        </tbody>
      </table>
    )
  }
}

const stateToProps = (state) => {
  return {
    roles: state.roleReducer.roles,
  }
}

const actionsToDispatch = (dispatch) => {
  return {
    getRoles: () => dispatch(getRoles())
  };
}
export default connect (stateToProps, actionsToDispatch)(Roles);