import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Login from '../login/login'
import Register from '../register/register'
import ViewWrapper from '../dashboard/view-wrapper';

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
            <Route path='/dashboard' component={ViewWrapper}/>
          </Switch>
          <div id="notification-service"></div>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
