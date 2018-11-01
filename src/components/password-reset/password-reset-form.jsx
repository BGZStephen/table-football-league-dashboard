import React, {Component} from 'react';
import ApiService from '../../services/api';
import NotificationService from '../../services/notification';
import FormError from '../form/form-error';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

class PasswordResetForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      token: '',
      formErrors: {
        email: null,
        password: null,
        confirmPassword: null,
      }
    }
  }

  render() {
    return (
      <div className="password-reset-form">
        <h1>Password Reset</h1>
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
            <input id="password" name="password" type="password" placeholder="New password" onChange={this.handleFormInputChange} />
          </div>
          {this.state.formErrors.password ? <FormError message={this.state.formErrors.password} /> : null}
          <div className="input-with-icon">
            <div className="icon">
              <FontAwesomeIcon icon="lock" fixedWidth />
            </div>
            <input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm password" onChange={this.handleFormInputChange} />
          </div>
          {this.state.formErrors.confirmPassword ? <FormError message={this.state.formErrors.confirmPassword} /> : null}
          <div className="actions-container">
            <button type="button" onClick={this.resetPassword}>Rest password</button>
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

  resetPassword = () => {
    if (!this.isFormValid()) {
      return;
    }
    
    ApiService.users.passwordResetUpdate({
      body: {
        email: this.state.email,
        password: this.state.password,
        token: this.state.token
      }
    }).then(res => {
      NotificationService.show('Password reset, please log in')
      this.props.onSuccess();
    }, err => {
      NotificationService.error(err)
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

  static getDerivedStateFromProps(newProps) {
    return newProps;
  }
}

export default PasswordResetForm;
