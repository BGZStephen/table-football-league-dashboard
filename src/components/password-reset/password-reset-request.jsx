import React, { Component } from 'react';
import PasswordResetRequestForm from './password-reset-request-form';

class PasswordResetRequest extends Component {
  constructor(props) {
    super(props)

    this.state = {
      submitted: false,
    }
  }

  render() {
    return (
      <div className="password-reset">
      {
        this.state.submitted ? (
          <div className="password-reset-confirmed">
            <p>Password reset requested, check your emails and follow the instructions.</p>
          </div>
        ) : <PasswordResetRequestForm onSuccess={() => this.setState({submitted: true})} /> 
      }
      </div>
    )
  }
}

export default PasswordResetRequest;
