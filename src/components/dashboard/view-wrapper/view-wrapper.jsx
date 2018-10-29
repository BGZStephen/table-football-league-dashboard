import React, {Component} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import { isAuthenticated } from '../../../services/auth';
import MobileTopNav from '../mobile-top-nav/mobile-top-nav';
import Menu from '../menu/menu';
import Home from '../home/home';
import Teams from '../teams/teams';
import TeamAdd from '../teams/add';
import TeamView from '../teams/view';
import TeamEdit from '../teams/edit';
import Leagues from '../leagues/leagues';
import LeaguesAdd from '../leagues/add';
import Fixtures from '../fixtures/fixtures';
import FixtureAdd from '../fixtures/add';
import FixtureEdit from '../fixtures/edit';
import Players from '../players/players';
import PlayerAdd from '../players/add';
import PlayerEdit from '../players/edit';
import PlayerView from '../players/view';

class ViewWrapper extends Component {
  constructor(props) {
    super(props)

    this.state = {
      menuVisible: false,
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="dashboard-view-wrapper">
          <MobileTopNav onMenuToggle={this.handleMenuToggle} />
          <Menu menuVisible={this.state.menuVisible} />
          <Switch>
            <Route exact path='/dashboard/home' render={() => (isAuthenticated() ? <Home /> : window.location.href='/login')}/>
            <Route exact path='/dashboard/players' render={() => (isAuthenticated() ? <Players /> : window.location.href='/login')}/>
            <Route exact path='/dashboard/players/add' render={() => (isAuthenticated() ? <PlayerAdd /> : window.location.href='/login')}/>
            <Route exact path='/dashboard/players/:id' render={() => (isAuthenticated() ? <PlayerView /> : window.location.href='/login')}/>
            <Route exact path='/dashboard/players/:id/edit' render={() => (isAuthenticated() ? <PlayerEdit /> : window.location.href='/login')}/>
            <Route exact path='/dashboard/teams' render={() => (isAuthenticated() ? <Teams /> : window.location.href='/login')}/>
            <Route exact path='/dashboard/teams/add' render={() => (isAuthenticated() ? <TeamAdd /> : window.location.href='/login')}/>
            <Route exact path='/dashboard/teams/:id' render={() => (isAuthenticated() ? <TeamView /> : window.location.href='/login')}/>
            <Route exact path='/dashboard/teams/:id/edit' render={() => (isAuthenticated() ? <TeamEdit /> : window.location.href='/login')}/>
            <Route exact path='/dashboard/fixtures' render={() => (isAuthenticated() ? <Fixtures /> : window.location.href='/login')}/>
            <Route exact path='/dashboard/fixtures/add' render={() => (isAuthenticated() ? <FixtureAdd /> : window.location.href='/login')}/>
            {/* <Route exact path='/fixtures/:id' component={FixtureView} /> */}
            <Route exact path='/dashboard/fixtures/:id/edit' render={() => (isAuthenticated() ? <FixtureEdit /> : window.location.href='/login')}/>
            <Route exact path='/dashboard/leagues' render={() => (isAuthenticated() ? <Leagues /> : window.location.href='/login')}/>
            <Route exact path='/dashboard/leagues/add' render={() => (isAuthenticated() ? <LeaguesAdd /> : window.location.href='/login')}/>
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
