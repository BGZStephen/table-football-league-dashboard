import _ from 'lodash';
import React, {Component} from 'react';
import ApiService from '../../../services/api';
import NotificationService from '../../../services/notification';
import TeamsList from '../teams/list';

class TeamsSelectModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      availableTeams: [],
      selectedTeams: [],
    }

    this.getTeams();
  }

  render() {
    return (
      <div className={this.state.visible ? "teams-select-modal modal visible" : "teams-select-modal modal"} onClick={this.backgroundClick}>
        <div className="modal-content modal-content-lg">
          <div className="panel panel-white">
            <div className="panel-title">
              <p>Select teams</p>
            </div>
            <div className="teams-list-container">
              <div className="row">
                <div className="col col-lg-6 teams-container">
                  <p>Available teams</p>
                  <TeamsList teams={this.state.availableTeams} options={false} onTeamSelect={this.selectTeam}/>
                </div>
                <div className="col col-lg-6 teams-container">
                  <p>Selected teams</p>
                  <TeamsList teams={this.state.selectedTeams} options={false} onTeamSelect={this.deselectTeam}/>
                </div>
              </div>
            </div>
            <div className="submit-container">
              <button type="button" onClick={this.submit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  static getDerivedStateFromProps(newProps) {
    if (newProps.preSelectedTeams) {
      const props = _.cloneDeep(newProps)
      props.teams = props.preSelectedTeams;
      return props;
    }

    return newProps;
  }

  getTeams = () => {
    ApiService.teams.index({
      query: {
        players: true,
      }
    })
      .then(res => {
        this.setState({availableTeams: res.data})
      }, err => {
        NotificationService.error(err.response.data.message)
      })
  }

  backgroundClick = (event) => {
    if (typeof event.target.className === 'string' && event.target.className.includes('modal')) {
      this.props.onClose();
    }
  }

  selectTeam = (team) => {
    const availableTeams = this.state.availableTeams;
    const selectedTeams = this.state.selectedTeams;

    for (const selectedTeam of selectedTeams) {
      if (selectedTeam._id === team._id) {
        return NotificationService.error('All teams must have unique players')
      }
    }

    for (let i = 0; i < availableTeams.length; i++) {
      if (availableTeams[i]._id === team._id) {
        availableTeams.splice(i, 1)
      }
    }

    selectedTeams.push(team);
    this.setState({
      selectedTeams,
      availableTeams
    })
  }

  deselectTeam = (team) => {
    const availableTeams = this.state.availableTeams;
    const selectedTeams = this.state.selectedTeams;

    for (let i = 0; i < selectedTeams.length; i++) {
      if (selectedTeams[i]._id === team._id) {
        selectedTeams.splice(i, 1)
      }
    }

    for (const availableTeam of availableTeams) {
      if (availableTeam._id === team._id) {
        this.setState({
          selectedTeams,
          availableTeams
        })
      }
    }

    availableTeams.push(team);
    this.setState({
      selectedTeams,
      availableTeams
    })
  }

  submit = () => {
    this.props.onTeamsSelect(this.state.selectedTeams)
  }
}

export default TeamsSelectModal;
