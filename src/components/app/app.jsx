import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Login from '../login/login'
import Register from '../register/register'
import PasswordReset from '../password-reset/password-reset'
import ViewWrapper from '../dashboard/view-wrapper/view-wrapper';
import Notification from '../notification/notification';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Switch>
            <Route exact path='/' render={() => (
              <Redirect to="/login"/>
            )}/>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route path='/password-reset/:id' component={PasswordReset}/>
            <Route path='/dashboard' component={ViewWrapper}/>
          </Switch>
          <Notification />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
