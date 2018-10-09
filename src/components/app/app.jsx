import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Login from '../login/login'
import Register from '../register/register'

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
          </Switch>
          <div id="notification-service"></div>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
