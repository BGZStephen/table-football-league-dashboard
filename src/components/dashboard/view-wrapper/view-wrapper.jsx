import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import MobileTopNav from '../mobile-top-nav/mobile-top-nav';
import Menu from '../menu/menu';
import Home from '../home/home';

class ViewWrapper extends Component {
  constructor(props) {
    super(props)

    this.state = {
      menuVisible: false,
    }
  }

  render() {
    return (
      <BrowserRouter basename="/dashboard">
        <div className="dashboard-view-wrapper">
          <MobileTopNav onMenuToggle={this.handleMenuToggle} />
          <Menu menuVisible={this.state.menuVisible} />
          <Switch>
            <Route path='' component={Home} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }

  handleMenuToggle = () => {
    this.setState({menuVisible: !this.state.menuVisible})
  }
}

export default ViewWrapper;
