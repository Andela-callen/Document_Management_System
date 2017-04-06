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
    console.log('Chineze: ', this.props.users)
    return (
      <div>
        { this.props.users.map(user => {
          return (
            <div key={user.id} className="card">
              <h2>{user.username}</h2>
              <div></div>
            </div>
          )
        })}
      </div>
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