import React, {Component} from 'react';
import Breadcrumbs from '../breadcrumbs/breadcrumbs'
import ApiService from '../../../services/api';
import NotificationService from '../../../services/notification';
import LeaguesList from './list';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { withRouter } from "react-router";

class Leagues extends Component {
  constructor({props}) {
    super(props)

    this.state = {
      leagues: [],
    }

    this.getLeagues();
  }

  render() {
    const breadcrumbs = [
      {
        label: 'dashboard',
      },
      {
        label: 'leagues',
        link: '/leagues'
      },
    ]

    return (
      <div className="leagues full-width-container">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <div className="content-container container-grey">
          <div className="row">
            <div className="col col-md-4">
              <div className="panel panel-white">
                <div className="panel-title">Leagues</div>
                <div className="leagues-list-container">
                  <LeaguesList leagues={this.state.leagues} options={true} onLeagueSelect={this.goToLeague}/>
                </div>
                <div className="actions-container">
                  <div className="row">
                    <div className="col col-sm-6">
                      <button type="button" onClick={this.onAddLeague}>
                        <FontAwesomeIcon icon="trophy" /> Add a league
                      </button>
                    </div>
                    <div className="col col-sm-6">
                      <button type="button" onClick={this.onAddTeam}>
                        <FontAwesomeIcon icon="users" /> Add a team
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>   
        </div>
      </div>
    )
  }

  getLeagues = () => {
    ApiService.leagues.index()
      .then(res => {
        this.setState({leagues: res.data})
      }, err => {
        NotificationService.error(err)
      })
  }

  onAddTeam = () => {
    this.goTo('/teams/add');
  }

  onAddLeague = () => {
    this.goTo('/leagues/add');
  }

  goToLeague = (league) => {
    return;
    this.props.history.push(`/leagues/${league._id}`)
  }

  goTo = (path) => {
    this.props.history.push(path)
  }
}

export default withRouter(Leagues);
