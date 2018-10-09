import React, { Component } from 'react';

class FormError extends Component {
  constructor(props) {
    super(props)

    this.state = {
      message: this.props.message,
    }
  }

  render() {
    return (
      <div className="form-error">
        <p>{this.props.message}</p>
      </div>
    )
  }
}

export default FormError;
