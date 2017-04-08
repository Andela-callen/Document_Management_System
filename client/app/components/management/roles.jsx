import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { signupEvent } from '../../actions/userAction'
import { Input, Button, Row, Col, Icon } from 'react-materialize'
import { getRoles } from '../../actions/roleAction'

class Roles extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.props.getRoles();
  // }

  componentDidMount() {
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
          {this.props.roles}
          { this.props.roles.map(role => {
          return (
            <tr key={role.id}>

              <td>{role.title}</td>
              <span><i className="material-icons">mode_edit</i></span>
              <span><i className="material-icons">delete</i></span>
            </tr>
          )
        })}
        </tbody>
      </table>
    )
  }
}

const stateToProps = (state) => {
  console.log('stateeeee',state)
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