import React, { Component } from 'react';
import ApiService from '../../services/api';

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      submitted: false,
    }
  }

  render() {
    return (
      <div className="login-form">
        <form>
          <input id="email" name="email" type="text" value={this.state.email} onChange={this.handleEmailChange}/>
          <input id="password" name="password" type="password" value={this.state.password} onChange={this.handlePasswordChange}/>
          <button type="button" onClick={this.authenticate}>Click me</button>
        </form>
      </div>
    )
  }

  handleEmailChange = (event) => {
    this.setState({email: event.target.value})
  }

  handlePasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  authenticate = () => {
    ApiService.users.authenticate({
      body: {
        email: this.state.email,
        password: this.state.password
      }
    }).then(res => {
      console.log(res)
    }, err => {
      console.log(err.response)
    })
  }
}

export default Login;
