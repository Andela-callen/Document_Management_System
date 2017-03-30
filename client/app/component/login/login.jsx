import React from 'react';
import { connect } from 'react-redux';
import { loginEvent } from '../../actions/loginAction';
import { Input, Button, Row, Col, Icon } from 'react-materialize';

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

  handleChange(event) {
    const changeProps = {};
    changeProps[event.target.name] = event.target.value;
    this.setState(changeProps);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.LoginAction(this.state.username, this.state.password);
  }

  render() {
    return (
      <form id ='signup' onSubmit={this.handleSubmit}>
        <Row>
          <Input className="formControl" name="username" onChange={this.handleChange} s={12} label="Username" value={this.state.username} />
          <Input className="formControl" name="password" onChange={this.handleChange} type="password" value={this.state.password} label="password" s={12} />
          <Button className="button" type="submit">Submit</Button>
        </Row>
      </form>
    );
  }
}

const stateToProps = (state) => {
  return {
    user: state.user
  }
};

const actionsToDispatch = (dispatch) => {
  return {
    LoginAction: (username, password) => dispatch(loginEvent(username, password))
  };
}

export default connect(stateToProps, actionsToDispatch)(Login);