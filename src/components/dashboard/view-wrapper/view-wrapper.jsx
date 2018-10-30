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
      <BrowserRouter basename='/dashboard'>
        <div className="dashboard-view-wrapper">
          <MobileTopNav onMenuToggle={this.handleMenuToggle} />
          <Menu menuVisible={this.state.menuVisible} />
          <Switch>
            <Route exact path='/home' render={() => (isAuthenticated() ? <Home /> : window.location.href='/login')}/>
            <Route exact path='/players' render={() => (isAuthenticated() ? <Players /> : window.location.href='/login')}/>
            <Route exact path='/players/add' render={() => (isAuthenticated() ? <PlayerAdd /> : window.location.href='/login')}/>
            <Route exact path='/players/:id' render={() => (isAuthenticated() ? <PlayerView /> : window.location.href='/login')}/>
            <Route exact path='/players/:id/edit' render={() => (isAuthenticated() ? <PlayerEdit /> : window.location.href='/login')}/>
            <Route exact path='/teams' render={() => (isAuthenticated() ? <Teams /> : window.location.href='/login')}/>
            <Route exact path='/teams/add' render={() => (isAuthenticated() ? <TeamAdd /> : window.location.href='/login')}/>
            <Route exact path='/teams/:id' render={() => (isAuthenticated() ? <TeamView /> : window.location.href='/login')}/>
            <Route exact path='/teams/:id/edit' render={() => (isAuthenticated() ? <TeamEdit /> : window.location.href='/login')}/>
            <Route exact path='/fixtures' render={() => (isAuthenticated() ? <Fixtures /> : window.location.href='/login')}/>
            <Route exact path='/fixtures/add' render={() => (isAuthenticated() ? <FixtureAdd /> : window.location.href='/login')}/>
            {/* <Route exact path='/fixtures/:id' component={FixtureView} /> */}
            <Route exact path='/fixtures/:id/edit' render={() => (isAuthenticated() ? <FixtureEdit /> : window.location.href='/login')}/>
            <Route exact path='/leagues' render={() => (isAuthenticated() ? <Leagues /> : window.location.href='/login')}/>
            <Route exact path='/leagues/add' render={() => (isAuthenticated() ? <LeaguesAdd /> : window.location.href='/login')}/>
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
