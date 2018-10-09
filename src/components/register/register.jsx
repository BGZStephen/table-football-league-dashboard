import React, { Component } from 'react';
import LoginForm from './register-form';

class Register extends Component {
  render() {
    return (
      <div className="login">
        <LoginForm onSuccess={() => this.goTo('/dashboard')} onRegister={() => this.goTo('/register')} /> 
      </div>
    )
  }

  goTo(path) {
    this.props.history.push(path)
  }
}

export default Register;
