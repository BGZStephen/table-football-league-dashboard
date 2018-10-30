import React, {Component} from 'react';
import ApiService from '../../services/api';
import NotificationService from '../../services/notification';
import FormError from '../form/form-error';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Link} from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      formErrors: {
        email: null,
        password: null
      }
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
            <input id="email" name="email" type="text" placeholder="Email" value={this.state.email} onChange={this.handleFormInputChange} />
          </div>
          {this.state.formErrors.email ? <FormError message={this.state.formErrors.email} /> : null}
          <div className="input-with-icon">
            <div className="icon">
              <FontAwesomeIcon icon="lock" fixedWidth />
            </div>
            <input id="password" name="password" type="password" placeholder="Password" value={this.state.password} onChange={this.handleFormInputChange} />
          </div>
          {this.state.formErrors.password ? <FormError message={this.state.formErrors.password} /> : null}
          <div className="actions-container">
            <button type="button" onClick={this.authenticate}>Login</button>
            <Link to="/register">Get registered</Link>
          </div>
        </form>
      </div>
    )
  }

  handleFormInputChange = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    const newState = this.state;

    newState.formErrors[id] = null;
    newState[id] = value;
    this.setState({state: newState})
  }

  authenticate = () => {
    if (!this.isFormValid()) {
      return;
    }
    
    ApiService.users.authenticate({
      body: {
        email: this.state.email,
        password: this.state.password
      }
    }).then(res => {
      console.log(res)
      localStorage.setItem('token', res.data.token)
      NotificationService.show('Login successful')
      this.props.onSuccess();
    }, err => {
      NotificationService.error(err.response.data.message)
    })
  }

  isFormValid = () => {
    const newState = this.state;
    let stateSetFlag = false;

    for (const key of Object.keys(newState.formErrors)) {
      newState.formErrors[key] = null;
    }

    if (!this.state.email) {
      newState.formErrors.email = 'Email is required';
      stateSetFlag = true;
    }

    if (!this.state.password) {
      newState.formErrors.password = 'Password is required';
      stateSetFlag = true;
    }

    if (stateSetFlag) {
      this.setState({state: newState})
      return false;
    }

    return true;
  }
}

export default Login;
