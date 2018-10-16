import _ from 'lodash';
import React, { Component } from 'react';
import ApiService from '../../services/api';
import NotificationService from '../../services/notification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import FormError from '../form/form-error';

class RegisterForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      submitted: false,
      formErrors: {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        confirmPassword: null,
      }
    }
  }

  render() {
    return (
      <div className="login-form">
        <h1>Register</h1>
        <p>Register for an account</p>
        <form>
          <div className="input-with-icon">
            <div className="icon">
              <FontAwesomeIcon icon="user" fixedWidth />
            </div>
            <input id="firstName" name="firstName" type="text" placeholder="First name" value={this.state.firstName} onChange={this.handleFormInputChange}/>
          </div>
            {this.state.formErrors.firstName ? <FormError message={this.state.formErrors.firstName} /> : null}
          <div className="input-with-icon">
            <div className="icon">
              <FontAwesomeIcon icon="user" fixedWidth />
            </div>
            <input id="lastName" name="lastName" type="text" placeholder="Last name" value={this.state.lastName} onChange={this.handleFormInputChange}/>
          </div>
          {this.state.formErrors.lastName ? <FormError message={this.state.formErrors.lastName} /> : null}
          <div className="input-with-icon">
            <div className="icon">
              <FontAwesomeIcon icon="envelope" fixedWidth />
            </div>
            <input id="email" name="email" type="text" placeholder="Email" value={this.state.email} onChange={this.handleFormInputChange}/>
          </div>
          {this.state.formErrors.email ? <FormError message={this.state.formErrors.email} /> : null}
          <div className="input-with-icon">
            <div className="icon">
              <FontAwesomeIcon icon="lock" fixedWidth />
            </div>
            <input id="password" name="password" type="password" placeholder="Password" value={this.state.password} onChange={this.handleFormInputChange}/>
          </div>
          {this.state.formErrors.password ? <FormError message={this.state.formErrors.password} /> : null}
          <div className="input-with-icon">
            <div className="icon">
              <FontAwesomeIcon icon="lock" fixedWidth />
            </div>
            <input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm password" value={this.state.confirmPassword} onChange={this.handleFormInputChange}/>
          </div>
          {this.state.formErrors.confirmPassword ? <FormError message={this.state.formErrors.confirmPassword} /> : null}
          <div className="actions-container">
            <button type="button" onClick={this.register}>Register</button>
            <Link to="/login">Already registered?</Link>
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

  register = () => {
    if (!this.isFormValid()) {
      return;
    }

    const apiFields = ['firstName', 'lastName', 'email', 'password'];

    ApiService.users.create({
      body: _.pick(this.state, apiFields)
    }).then(res => {
      localStorage.setItem('token', res.data.token)
      NotificationService.show('Registration successful')
      this.props.onSuccess();
    }, err => {
      NotificationService.show(err.response.data.message)
    })
  }

  isFormValid = () => {
    const newState = this.state;
    let stateSetFlag = false;

    for (const key of Object.keys(newState.formErrors)) {
      newState.formErrors[key] = null;
    }

    if (!this.state.firstName) {
      newState.formErrors.firstName = 'First name is required';
      stateSetFlag = true;
    }

    if (!this.state.lastName) {
      newState.formErrors.lastName = 'Last name is required';
      stateSetFlag = true;
    }

    if (!this.state.email) {
      newState.formErrors.email = 'Email is required';
      stateSetFlag = true;
    }

    if (!this.state.password) {
      newState.formErrors.password = 'Password is required';
      stateSetFlag = true;
    }

    // 1 lowercase, 1 uppercase, 1 numeric, 8 char minimum
    const passwordStrengthRegexp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
    if (!this.state.password.match(passwordStrengthRegexp)) {
      newState.formErrors.password = 'Password must contain 1 lowercase character, 1 uppercase character, 1 number and be at leaset 8 characters long';
      stateSetFlag = true;
    };

    if (!this.state.confirmPassword && this.state.password) {
      newState.formErrors.confirmPassword = 'Please confirm your password';
      stateSetFlag = true;
    }

    if (this.state.confirmPassword && this.state.password && this.state.confirmPassword !== this.state.password) {
      newState.formErrors.confirmPassword = 'Passwords do not match';
      stateSetFlag = true;
    }

    if (stateSetFlag) {
      this.setState({state: newState})
      return false;
    }

    return true;
  }
}

export default RegisterForm;
