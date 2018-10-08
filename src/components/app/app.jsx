import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Login from '../login/login'

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
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
