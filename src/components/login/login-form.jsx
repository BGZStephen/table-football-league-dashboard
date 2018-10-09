import React, { Component } from 'react';
import ApiService from '../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';

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
        <h1>Login</h1>
        <p>Sign In to your account</p>
        <form>
          <div className="input-with-icon">
            <div className="icon">
              <FontAwesomeIcon icon="envelope" fixedWidth />
            </div>
            <input id="email" name="email" type="text" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange}/>
          </div>
          <div className="input-with-icon">
            <div className="icon">
              <FontAwesomeIcon icon="lock" fixedWidth />
            </div>
            <input id="password" name="password" type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}/>
          </div>
          <div className="actions-container">
            <button type="button" onClick={this.authenticate}>Login</button>
            <Link to="/register">Get registered</Link>
          </div>
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
