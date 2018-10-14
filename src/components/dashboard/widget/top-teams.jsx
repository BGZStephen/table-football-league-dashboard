import React, {Component} from 'react';
import ApiService from '../../../services/api';
import NotificationService from '../../../services/notification';
import TeamsList from '../teams/list';

class TopTeamsWidget extends Component {
  constructor(props) {
    super(props)

    this.state = {
      teams: [],
    }

    this.getFixtures();
  }

  render() {
    if (!this.state.teams.length) {
      return null;
    }

    return (
      <div className="panel panel-white">
        <div className="panel-title">
          <p>Top Teams</p>
        </div>
        <div className="upcoming-fixtures">
          <TeamsList teams={this.state.teams} onTeamSelect={() => {}}/>
        </div>
      </div>
    )
  }

  getFixtures = () => {
    ApiService.teams.index({
      query: {
        limit: 5,
        players: true,
      }
    })
      .then(res => {
        this.setState({teams: res.data})
      }, err => {
        NotificationService.error(err.response.data.message)
      })
  }
}

export default TopTeamsWidget;
