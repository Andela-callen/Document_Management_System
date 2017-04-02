import React from 'react';
import { connect } from 'react-redux';
import { browserHistory, Route } from 'react-router';
import {loginEvent} from '../../actions/userAction'
import {Input, Button, Row, Col, Icon } from 'react-materialize';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
  }

  handleChange(event) {
    const changeProps = {};
    changeProps[event.target.name] = event.target.value;
    this.setState(changeProps);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.LoginAction(this.state.username, this.state.password).then(() => {
      browserHistory.push('/dashboard');
    });
  }

    render() {
      console.log(this.props.user);
      return (
        <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
            <Input s={6} type="text" className="form-control" value={this.state.username} name="username" label="Username" validate></Input>
            <Input s={6} type="password" className="form-control" value={this.state.password} name="password" label="Password" validate></Input>
             <input className="waves-effect waves-light btn" type="submit" value="Submit" />
        </form>
      );
    } 
}
const stateToProps = (state) => {
  return {
    login_success: state.userReducer.login_success
  }
};

const actionsToDispatch = (dispatch) => {
  return {
    LoginAction: (username, password) => dispatch(loginEvent(username, password))
  };
}

export default connect(stateToProps, actionsToDispatch)(Login);