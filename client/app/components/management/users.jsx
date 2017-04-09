import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { signupEvent } from '../../actions/userAction'
import { Input, Button, Row, Col, Icon } from 'react-materialize'
import { getUsers} from '../../actions/userAction'

class Users extends React.Component {
  componentWillMount() {
    this.props.getUsers();
  }

  render() {
    return (

      <table className="striped">
        <thead>
          <tr>
              <th>Username</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
          </tr>
        </thead>

        <tbody>
          { this.props.users.map(user => {
          return (
            <tr key={user.id}>

              <td>{user.username}</td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
              <td><i className="material-icons">mode_edit</i>
              <i className="material-icons">delete</i></td>
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
    users: state.userReducer.users,
  }
}

const actionsToDispatch = (dispatch) => {
  return {
    getUsers: () => dispatch(getUsers())
  };
}
export default connect(stateToProps, actionsToDispatch)(Users);