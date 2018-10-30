import React, {Component} from 'react';
import Breadcrumbs from '../breadcrumbs/breadcrumbs'
import ApiService from '../../../services/api';
import NotificationService from '../../../services/notification';
import TeamsList from './list';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { withRouter } from "react-router";

class Teams extends Component {
  constructor(props) {
    super(props)

    this.state = {
      teams: [],
    }

    this.getTeams();
  }

  render() {
    const breadcrumbs = [
      {
        label: 'dashboard',
      },
      {
        label: 'teams',
        link: '/teams'
      },
    ]

    return (
      <div className="teams full-width-container">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <div className="content-container container-grey">
          <div className="row">
            <div className="col col-md-4">
              <div className="panel panel-white">
                <div className="panel-title">Teams</div>
                <div className="teams-list-container">
                  <TeamsList teams={this.state.teams} options={true} onTeamSelect={this.goToTeam}/>
                </div>
                <div className="actions-container">
                  <div className="row">
                    <div className="col col-sm-6">
                      <button type="button" onClick={this.onAddTeam}>
                        <FontAwesomeIcon icon="users" /> Add a team
                      </button>
                    </div>
                    <div className="col col-sm-6">
                      <button type="button" onClick={this.onAddPlayer}>
                        <FontAwesomeIcon icon="user" /> Add a player
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

  getTeams = () => {
    ApiService.teams.index({
      query: {
        players: true
      }
    })
      .then(res => {
        this.setState({teams: res.data})
      }, err => {
        NotificationService.error(err.response.data.message)
      })
  }

  goToTeam = (team) => {
    return;
    this.props.history.push(`/teams/${team._id}`)
  }

  onAddPlayer = () => {
    this.goTo('/players/add');
  }

  onAddTeam = () => {
    this.goTo('/teams/add');
  }

  goTo = (path) => {
    this.props.history.push(path)
  }
}

export default withRouter(Teams);
