import React from 'react';
import {Input, Button, Row, Col, Icon } from 'react-materialize';

class Signup extends React.Component {

   constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      password_confirmation: ''
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
    $.post('/users', this.state)
    .done((data) => {
      console.log(data);
    });
  }

  render() {
    return (
      <form id ='signup' onSubmit={this.handleSubmit}>
        <Row>
          <Input className="formControl" name="firstname" onChange={this.handleChange} placeholder="First Name" s={6} value={this.state.firstname} />
          <Input className="formControl" name="lastname" onChange={this.handleChange} s={6} placeholder="Last Name" value={this.state.lastname}/>
          <Input className="formControl" name="username" onChange={this.handleChange} s={12} label="Username" value={this.state.username} />
          <Input className="formControl" name="password" onChange={this.handleChange} type="password" value={this.state.password} label="password" s={12} />
          <Input className="formControl" name="password_confirmation" onChange={this.handleChange} type="password" value={this.state.password_confirmation} label="password confirmation" s={12} />
          <Input className="formControl" name="email" type="email" onChange={this.handleChange} label="Email" value={this.state.email} s={12} />
          <Button className="button" type="submit">Submit</Button>
        </Row>
      </form>
    );
  }
}

export default Signup;