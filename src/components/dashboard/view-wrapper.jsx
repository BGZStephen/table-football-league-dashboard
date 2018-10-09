import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import MobileTopNav from './mobile-top-nav';

class ViewWrapper extends Component {
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
      <BrowserRouter basename="/dashboard">
        <div className="dashboard-view-wrapper">
          <MobileTopNav />
          <Switch>

          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default ViewWrapper;
