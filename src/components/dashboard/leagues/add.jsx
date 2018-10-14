import React, {Component} from 'react';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import ApiService from '../../../services/api';
import NotificationService from '../../../services/notification';
import FormError from '../../form/form-error';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class LeaguesAdd extends Component {
  constructor({props}) {
    super(props)

    this.state = {
      formErrors: {},
      gamesPerSeason: 2,
      teams: [],
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
          {/* <TeamsSelectModal 
            visible={this.state.playerSelectModalVisible} 
            onPlayerSelect={this.setPlayer} 
            onClose = {this.onPlayerSelectModalClose}
          /> */}
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
                    <div class="radios-container">
                      <div class="radio-group">
                        <input type="radio" id="2" name="games" value="2" onChange={this.handleFormInputChange} />
                        <label for="2">2</label>
                      </div>
                      <div class="radio-group">
                        <input type="radio" id="4" name="games" value="4" onChange={this.handleFormInputChange} />
                        <label for="4">4</label>
                      </div>
                      <div class="radio-group">
                        <input type="radio" id="6" name="games" value="6" onChange={this.handleFormInputChange} />
                        <label for="6">6</label>
                      </div>
                      <div class="radio-group">
                        <input type="radio" id="8" name="games" value="8" onChange={this.handleFormInputChange} />
                        <label for="8">8</label>
                      </div>
                    </div>
                    {this.state.formErrors.name ? <FormError message={this.state.formErrors.name} /> : null}
                  </div>
                  <div className="input-group">
                    <label>Teams</label>
                    {this.state.formErrors.players ? <FormError message={this.state.formErrors.players} /> : null}
                  </div>
                  {this.state.teams.length > 0 ? (
                    <div className="teams">
                      {this.state.teams.map((team, index) => (
                        <div className="team">
                          <div class="team-remove-overlay" onClick={() => this.removeTeam(index)}>
                            <FontAwesomeIcon icon="trash" />
                            <p>Remove team</p>
                          </div>
                          <div className="team-name-container">
                            <p>{team.name}</p>
                          </div>
                          <div className="players-container">
                            {team.players.map(player => (
                              <div className="player">
                                <div class="player-icon">
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
                  <div className="teams teams-add" onClick={this.showPlayerSelectModal}>
                    <p>Add teams</p>
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
    this.setState({gamesPerSeason: event.target.value})
  }

  onSubmit = () => {
    if (!this.isFormValid()) {
      return;
    }

    ApiService.teams.create({
      body: {
        name: this.state.name,
        players: this.state.players.map(player => player._id),
      }
    }).then(res => {
      NotificationService.show('Team created successfully');
      this.props.history.push('/teams')
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
      newState.formErrors.name = 'Name is required';
      stateSetFlag = true;
    }

    if (!this.state.gamesPerSeason) {
      newState.formErrors.gamesPerSeason = 'Please select a number of games';
      stateSetFlag = true;
    }

    if (this.state.teams.length < 3) {
      newState.formErrors.players = 'A league requires at least 3 teams';
      stateSetFlag = true;
    }

    if (stateSetFlag) {
      this.setState({state: newState})
      return false;
    }

    return true;
  }
}

export default LeaguesAdd;
