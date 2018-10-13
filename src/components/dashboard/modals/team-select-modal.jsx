import React, {Component} from 'react';
import ApiService from '../../../services/api';
import NotificationService from '../../../services/notification';
import TeamsList from '../teams/list';

class TeamSelectModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      teams: [],
    }

    this.getTeams();
  }

  render() {
    return (
      <div className={this.state.visible ? "team-select-modal modal visible" : "team-select-modal modal"} onClick={this.backgroundClick}>
        <div className="modal-content">
          <div className="panel panel-white">
            <div className="panel-title">
              <p>Select a team</p>
            </div>
            <div className="players-list-container">
              <TeamsList teams={this.state.teams} options={false} onTeamSelect={this.props.onTeamSelect}/>
            </div>
          </div>
        </div>
      </div>
    )
  }

  static getDerivedStateFromProps(newProps) {
    return newProps;
  }

  getTeams = () => {
    ApiService.teams.index({
      query: {
        players: true,
      }
    })
      .then(res => {
        this.setState({teams: res.data})
      }, err => {
        NotificationService.error(err.response.data.message)
      })
  }

  backgroundClick = (event) => {
    if (event.target.className.includes('modal')) {
      this.props.onClose();
    }
  }
}

export default TeamSelectModal;
