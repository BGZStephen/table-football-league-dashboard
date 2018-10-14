import React, { Component } from 'react';
import LoginForm from './login-form';

class Login extends Component {
  render() {
    return (
      <div className="login">
        <LoginForm onSuccess={() => this.goTo('/dashboard/home')} onRegister={() => this.goTo('/register')} /> 
      </div>
    )
  }

  goTo(path) {
    this.props.history.push(path)
  }
}

export default Login;
