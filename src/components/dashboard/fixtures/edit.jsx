import moment from 'moment';
import React, {Component} from 'react';
import Breadcrumbs from '../breadcrumbs/breadcrumbs'
import ApiService from '../../../services/api';
import NotificationService from '../../../services/notification';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import FormError from '../../form/form-error';
import TeamSelectModal from '../modals/team-select-modal'

class FixtureEdit extends Component {
  constructor(props) {
    super(props)

    this.state = {
      formErrors: {},
      fixture: {
        date: '',
        teams: [],
      },
      teamSelectModalVisible: false,
    }

    this.fetchFixture()
  }

  render() {
    const breadcrumbs = [
      {
        label: 'dashboard',
      },
      {
        label: 'fixtures',
        link: '/fixtures'
      },
      {
        label: `${this.state.fixture.teams[0] ? this.state.fixture.teams[0].name : ''} vs ${this.state.fixture.teams[1] ? this.state.fixture.teams[1].name : ''}`,
        link: `/fixtures/${this.state.fixture._id}`
      },
    ]

    return (
      <div className="fixtures-add full-width-container">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <div className="content-container container-grey">
          <TeamSelectModal 
            visible={this.state.teamSelectModalVisible} 
            onTeamSelect={this.setTeam} 
            onClose = {this.onTeamSelectModalClose}
          />
          <div className="row">
            <div className="col col-lg-4">
              <div className="panel panel-white">
                <p className="panel-title">Edit a fixture</p>
                <form>
                  <div className="input-group">
                    <label>Date</label>
                    <input type="date" id="date" name="date" value={moment(this.state.fixture.date).format('YYYY-MM-DD')} onChange={this.handleFormInputChange} />
                    {this.state.formErrors.date ? <FormError message={this.state.formErrors.date} /> : null}
                  </div>
                  <div className="input-group">
                    <label>Teams</label>
                    {this.state.formErrors.teams ? <FormError message={this.state.formErrors.teams} /> : null}
                  </div>
                  <div className="teams-container">
                    <div className="row">
                      <div className="col col-xl-5">
                        {
                          this.state.fixture.teams[0] ? (
                            <div className="team">
                              <div class="team-remove-overlay" onClick={() => this.removeTeam(0)}>
                                <p>Remove team</p>
                                <FontAwesomeIcon icon="trash" />
                              </div>
                              <p>{this.state.fixture.teams[0].name}</p>
                              <div className="players-container">
                                {this.state.fixture.teams[0].players.map(player => (
                                  <div className="player">
                                    <div class="player-icon">
                                      <FontAwesomeIcon fixedWidth icon="user" />
                                    </div>
                                    {player.name}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )
                          : <div className="team team-add" onClick={this.showTeamSelectModal}>
                            <p>Add a team</p>
                            <FontAwesomeIcon icon="plus" />
                          </div>
                        }
                      </div>
                      <div className="col col-xl-2 vs-container">
                        VS
                      </div>
                      <div className="col col-xl-5">
                        {
                          this.state.fixture.teams[1] ? (
                            <div className="team">
                              <div class="team-remove-overlay" onClick={() => this.removeTeam(0)}>
                                <p>Remove team</p>
                                <FontAwesomeIcon icon="trash" />
                              </div>
                              <p>{this.state.fixture.teams[1].name}</p>
                              <div className="players-container">
                                {this.state.fixture.teams[1].players.map(player => (
                                  <div className="player">
                                    <div class="player-icon">
                                      <FontAwesomeIcon fixedWidth icon="user" />
                                    </div>
                                    {player.name}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )
                          : <div className="team team-add" onClick={this.showTeamSelectModal}>
                            <p>Add a team</p>
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

  static getDerivedStateFromProps(newProps) {
    return newProps;
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

    ApiService.fixtures.update({
      params: {
        id: this.state.fixture._id
      },
      body: this.state.fixture
    }).then(res => {
      NotificationService.show('Fixture updated successfully');
      this.props.history.push('/fixtures')
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

    if (!this.state.fixture.date) {
      newState.formErrors.date = 'Date is required';
      stateSetFlag = true;
    }

    if (this.state.fixture.teams.length < 2) {
      newState.formErrors.teams = '2 teams are required for a fixture';
      stateSetFlag = true;
    }

    if (stateSetFlag) {
      this.setState({state: newState})
      return false;
    }

    return true;
  }

  showTeamSelectModal = () => {
    this.setState({teamSelectModalVisible: true})
  }

  onTeamSelectModalClose = () => {
    this.setState({teamSelectModalVisible: false})
  }

  setTeam = (team) => {
    const currentTeams = this.state.fixture.teams;
    const formErrors = this.state.formErrors;

    if (currentTeams.length >= 2) {
      return;
    }

    if (currentTeams.length >= 1) {
      for (const teamOnePlayer of currentTeams[0].players) {
        for (const teamTwoPlayer of team.players) {
          if (teamOnePlayer._id === teamTwoPlayer._id) {
            return NotificationService.error('Fixtures must contain 4 unique players');
          }
        }  
      }
    }

    formErrors.teams = null

    currentTeams.push(team);
    this.setState({
      teams: currentTeams,
      teamSelectModalVisible: false,
      formErrors,
    })
  }

  removeTeam = (index) => {
    const currentFixtures = this.state.fixture.teams;

    if (currentFixtures.length === 0) {
      return;
    }

    currentFixtures.splice(index, 1);
    this.setState({
      fixtures: currentFixtures,
    })
  }

  fetchFixture = () => {
    const id =this.props.match.params.id;

    ApiService.fixtures.get({
      params: {
        id,
      },
      query: {
        teams: true,
        players: true,
      }
    })
    .then(res => {
      this.setState({fixture: res.data})
    }, err => {
      NotificationService.error(err.response.data.message)
    })
  }
}

export default FixtureEdit;
