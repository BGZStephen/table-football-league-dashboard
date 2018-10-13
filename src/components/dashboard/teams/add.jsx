import React, {Component} from 'react';
import Breadcrumbs from '../breadcrumbs/breadcrumbs'
import ApiService from '../../../services/api';
import NotificationService from '../../../services/notification';
import FormError from '../../form/form-error';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import PlayerSelectModal from '../modals/player-select-modal'

class TeamAdd extends Component {
  constructor(props) {
    super(props)

    this.state = {
      formErrors: {},
      name: '',
      players: [],
      playerSelectModalVisible: false,
    }
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
      {
        label: 'add',
        link: '/teams/add'
      },
    ]

    return (
      <div className="teams-add full-width-container">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <div className="content-container container-grey">
          <PlayerSelectModal 
            visible={this.state.playerSelectModalVisible} 
            onPlayerSelect={this.setPlayer} 
            onClose = {this.onPlayerSelectModalClose}
          />
          <div className="row">
            <div className="col col-sm-3">
              <div className="panel panel-white">
                <p className="panel-title">Add a team</p>
                <form>
                  <div className="input-group">
                    <label>Name</label>
                    <input type="text" id="name" name="name" placeholder="Jon Doe" onChange={this.handleFormInputChange} />
                    {this.state.formErrors.name ? <FormError message={this.state.formErrors.name} /> : null}
                  </div>
                  <div className="input-group">
                    <label>Players</label>
                    {this.state.formErrors.players ? <FormError message={this.state.formErrors.players} /> : null}
                  </div>
                  <div className="players-container">
                    <div className="row">
                      <div className="col col-md-6">
                        {
                          this.state.players[0] ? (
                            <div className="player">
                              <div class="player-remove-overlay" onClick={() => this.removePlayer(0)}>
                                <p>Remove player</p>
                                <FontAwesomeIcon icon="trash" />
                              </div>
                              <p>{this.state.players[0].name}</p>
                              <div className="positions-container">
                                {this.state.players[0].position.striker ? 
                                  <div className="position striker">
                                    <FontAwesomeIcon icon="crosshairs" />
                                  </div> : null
                                }
                                {this.state.players[0].position.defender ? 
                                  <div className="position defender">
                                    <FontAwesomeIcon icon="shield-alt" />
                                  </div> : null
                                }
                              </div>
                            </div>
                          )
                          : <div className="player player-add" onClick={this.showPlayerSelectModal}>
                            <p>Add a player</p>
                            <FontAwesomeIcon icon="plus" />
                          </div>
                        }
                      </div>
                      <div className="col col-md-6">
                        {
                          this.state.players[1] ? (
                            <div className="player">
                              <div class="player-remove-overlay" onClick={() => this.removePlayer(1)}>
                                <p>Remove player</p>
                                <FontAwesomeIcon icon="trash" />
                              </div>
                              <p>{this.state.players[1].name}</p>
                              <div className="positions-container">
                                {this.state.players[1].position.striker ? 
                                  <div className="position striker">
                                    <FontAwesomeIcon icon="crosshairs" />
                                  </div> : null
                                }
                                {this.state.players[1].position.defender ? 
                                  <div className="position defender">
                                    <FontAwesomeIcon icon="shield-alt" />
                                  </div> : null
                                }
                              </div>
                            </div>
                          )
                          : <div className="player player-add" onClick={this.showPlayerSelectModal}>
                            <p>Add a player</p>
                            <FontAwesomeIcon icon="plus" />
                          </div>
                        }
                      </div>
                    </div>
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

  toggleStriker = () => {
    const newState = this.state;
    newState.formErrors.position = null;
    newState.striker = !this.state.striker;
    this.setState(newState)
  }

  toggleDefender = () => {
    const newState = this.state;
    newState.formErrors.position = null;
    newState.defender = !this.state.defender;
    this.setState(newState)
  }

  handleFormInputChange = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    const newState = this.state;

    newState.formErrors[id] = null;
    newState[id] = value;
    this.setState({state: newState})
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

    if (this.state.players.length !== 2) {
      newState.formErrors.players = 'A team requires 2 players';
      stateSetFlag = true;
    }

    if (stateSetFlag) {
      this.setState({state: newState})
      return false;
    }

    return true;
  }

  showPlayerSelectModal = () => {
    this.setState({playerSelectModalVisible: true})
  }

  onPlayerSelectModalClose = () => {
    this.setState({playerSelectModalVisible: false})
  }

  setPlayer = (player) => {
    const currentPlayers = this.state.players;
    const formErrors = this.state.formErrors;

    if (currentPlayers.length >= 2) {
      return;
    }

    for (const currentPlayer of currentPlayers) {
      if (currentPlayer._id === player._id) {
        NotificationService.error('Teams cannot have the same player twice')        
        return;
      }
    }

    formErrors.players = null

    currentPlayers.push(player);
    this.setState({
      players: currentPlayers,
      playerSelectModalVisible: false,
      formErrors,
    })
  }

  removePlayer = (index) => {
    const currentPlayers = this.state.players;

    if (currentPlayers.length === 0) {
      return;
    }

    currentPlayers.splice(index, 1);
    this.setState({
      players: currentPlayers,
    })
  }
}

export default TeamAdd;
