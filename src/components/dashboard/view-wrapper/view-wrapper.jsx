import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import MobileTopNav from '../mobile-top-nav/mobile-top-nav';
import Menu from '../menu/menu';
import Home from '../home/home';
import Teams from '../teams/teams';
import TeamsAdd from '../teams/add';
import Leagues from '../leagues/leagues';
import LeaguesAdd from '../leagues/add';
import Fixtures from '../fixtures/fixtures';
import FixturesAdd from '../fixtures/add';
import Players from '../players/players';
import PlayersAdd from '../players/add';

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
            <Route exact path='/home' component={Home} />
            <Route exact path='/players' component={Players} />
            <Route exact path='/players/add' component={PlayersAdd} />
            <Route exact path='/teams' component={Teams} />
            <Route exact path='/teams/add' component={TeamsAdd} />
            <Route exact path='/fixtures' component={Fixtures} />
            <Route exact path='/fixtures/add' component={FixturesAdd} />
            <Route exact path='/leagues' component={Leagues} />
            <Route exact path='/leagues/add' component={LeaguesAdd} />
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
