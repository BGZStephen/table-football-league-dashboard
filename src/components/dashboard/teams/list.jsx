import React, {Component} from 'react';
import TeamsListItem from './list-item';

class TeamsList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      teams: [],
      options: false,
    }
  }

  render() {
    return (
      <div className="teams-list">
        {this.state.teams.map(team => <TeamsListItem key={team._id} team={team} options={this.state.options} onTeamSelect={(team) => {this.props.onTeamSelect(team) }}/>)}
      </div>
    )
  }

  static getDerivedStateFromProps(newProps) {
    return newProps;
  }
}

export default TeamsList;
