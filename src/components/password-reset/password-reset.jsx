import React, { Component } from 'react';
import ApiService from '../../services/api';
import NotificationService from '../../services/notification';
import PasswordResetForm from './password-reset-form';

class PasswordReset extends Component {
  constructor(props) {
    super(props)

    this.validateToken();
  }

  render() {
    return (
      <div className="password-reset">
        <PasswordResetForm onSuccess={() => this.goTo('/login')} /> 
      </div>
    )
  }

  goTo(path) {
    this.props.history.push(path)
  }

  validateToken = () => {
    const token = this.props.match.params.id;
    ApiService.users.passwordResetToken({
      query: {
        token
      }
    })
    .then(
      res => {},
      err => {
        NotificationService.error('Invalid password reset link')
        this.props.history.push('/login');
      }
    )
  }
}

export default PasswordReset;
