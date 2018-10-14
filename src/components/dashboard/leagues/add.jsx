import React, {Component} from 'react';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import ApiService from '../../../services/api';
import NotificationService from '../../../services/notification';
import FormError from '../../form/form-error';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import TeamsSelectModal from '../modals/teams-select-modal';

class LeaguesAdd extends Component {
  constructor({props}) {
    super(props)

    this.state = {
      formErrors: {},
      name: '',
      gamesPerSeason: null,
      teams: [],
      teamsSelectModalVisible: false,
    }
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
      {
        label: 'add',
        link: '/leagues/add'
      },
    ]

    return (
      <div className="leagues-add full-width-container">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <div className="content-container container-grey">
          <TeamsSelectModal
            preSelectedTeams={this.state.teams} 
            visible={this.state.teamsSelectModalVisible} 
            onTeamsSelect={this.setTeams} 
            onClose = {this.onTeamsSelectModalClose}
          />
          <div className="row">
            <div className="col col-sm-3">
              <div className="panel panel-white">
                <p className="panel-title">Add a league</p>
                <form>
                  <div className="input-group">
                    <label>Name</label>
                    <input type="text" id="name" name="name" placeholder="Jon Doe" onChange={this.handleFormInputChange} />
                    {this.state.formErrors.name ? <FormError message={this.state.formErrors.name} /> : null}
                  </div>
                  <div className="input-group">
                    <label>Games per season</label>
                    <div className="radios-container">
                      <div className="radio-group">
                        <input type="radio" id="2" name="games" value="2" onChange={this.handleGamesPerSeasonChange} />
                        <label htmlFor="2">2</label>
                      </div>
                      <div className="radio-group">
                        <input type="radio" id="4" name="games" value="4" onChange={this.handleGamesPerSeasonChange} />
                        <label htmlFor="4">4</label>
                      </div>
                      <div className="radio-group">
                        <input type="radio" id="6" name="games" value="6" onChange={this.handleGamesPerSeasonChange} />
                        <label htmlFor="6">6</label>
                      </div>
                      <div className="radio-group">
                        <input type="radio" id="8" name="games" value="8" onChange={this.handleGamesPerSeasonChange} />
                        <label htmlFor="8">8</label>
                      </div>
                    </div>
                    {this.state.formErrors.gamesPerSeason ? <FormError message={this.state.formErrors.gamesPerSeason} /> : null}
                  </div>
                  <div className="input-group">
                    <label>Teams</label>
                    {this.state.formErrors.teams ? <FormError message={this.state.formErrors.teams} /> : null}
                  </div>
                  {this.state.teams.length > 0 ? (
                    <div className="teams">
                      {this.state.teams.map((team) => (
                        <div className="team" key={team._id}>
                          <div className="team-name-container">
                            <p>{team.name}</p>
                          </div>
                          <div className="players-container">
                            {team.players.map(player => (
                              <div className="player" key={player._id}>
                                <div className="player-icon">
                                  <FontAwesomeIcon fixedWidth icon="user" />
                                </div>
                                {player.name}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ): null}
                  <div className="teams teams-add" onClick={this.showTeamsSelectModal}>
                    <p>Select teams</p>
                    <FontAwesomeIcon icon="plus" />
                  </div>
                  <div className="input-group">
                    <button type="button" onClick={this.onSubmit}>Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  handleFormInputChange = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    const newState = this.state;

    newState.formErrors[id] = null;
    newState[id] = value;
    this.setState({state: newState})
  }

  handleGamesPerSeasonChange = (event) => {
    const formErrors = this.state.formErrors;
    formErrors.gamesPerSeason = null

    this.setState({
      gamesPerSeason: event.target.value,
      formErrors
    })
  }

  onSubmit = () => {
    if (!this.isFormValid()) {
      return;
    }

    ApiService.leagues.create({
      body: {
        name: this.state.name,
        gamesPerSeason: this.state.gamesPerSeason,
        teams: this.state.teams.map(team => team._id)
      }
    }).then(res => {
      NotificationService.show('League created successfully');
      this.props.history.push('/leagues')
    }, err => {
      NotificationService.error(err.response.data.message)
    })
  }

  isFormValid = () => {
    const newState = this.state;
    let stateSetFlag = false;

    for (const key of Object.keys(newState.formErrors)) {
      newState.formErrors[key] = null;
    }

    if (!this.state.name) {
      newState.formErrors.name = 'League name is required';
      stateSetFlag = true;
    }

    if (!this.state.gamesPerSeason) {
      newState.formErrors.gamesPerSeason = 'Please select a number of games';
      stateSetFlag = true;
    }

    if (this.state.teams.length < 3) {
      newState.formErrors.teams = 'A league requires at least 3 teams';
      stateSetFlag = true;
    }

    if (stateSetFlag) {
      this.setState({state: newState})
      return false;
    }

    return true;
  }

  setTeams = (teams) => {
    const formErrors = this.state.formErrors;
    formErrors.teams = null

    this.setState({
      teams,
      teamsSelectModalVisible: false,
      formErrors,
    })
  }

  onTeamsSelectModalClose = () => {
    this.setState({teamsSelectModalVisible: false})
  }

  showTeamsSelectModal = () => {
    this.setState({teamsSelectModalVisible: true})
  }
}

export default LeaguesAdd;
