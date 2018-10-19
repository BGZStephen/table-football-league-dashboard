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
          <p>Submitted</p>
        ) : <PasswordResetRequestForm onSuccess={() => this.setState({submitted: true})} /> 
      }
      </div>
    )
  }
}

export default PasswordResetRequest;
