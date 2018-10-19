import React, {Component} from 'react';
import ApiService from '../../services/api';
import NotificationService from '../../services/notification';
import FormError from '../form/form-error';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

class PasswordResetRequestForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      formErrors: {
        email: null,
      }
    }
  }

  render() {
    return (
      <div className="password-reset-form">
        <h1>Reset your password</h1>
        <form>
          <div className="input-with-icon">
            <div className="icon">
              <FontAwesomeIcon icon="envelope" fixedWidth />
            </div>
            <input id="email" name="email" type="text" placeholder="Email" value={this.state.email} onChange={this.handleFormInputChange} />
          </div>
          {this.state.formErrors.email ? <FormError message={this.state.formErrors.email} /> : null}
          <div className="actions-container">
            <button type="button" onClick={this.resetPassword}>Submit</button>
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
    
    ApiService.users.passwordReset({
      body: {
        email: this.state.email,
      }
    }).then(res => {
      NotificationService.show('Password reset email sent!')
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

    if (stateSetFlag) {
      this.setState({state: newState})
      return false;
    }

    return true;
  }
}

export default PasswordResetRequestForm;
