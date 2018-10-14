import React, {Component} from 'react';
import LeaguesListItem from './list-item';

class LeaguesList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      leagues: [],
      options: false,
    }
  }

  render() {
    return (
      <div className="leagues-list">
        {this.state.leagues.map(league => <LeaguesListItem key={league._id} league={league} options={this.state.options} onLeagueSelect={(league) => {this.props.onLeagueSelect(league) }}/>)}
      </div>
    )
  }

  static getDerivedStateFromProps(newProps) {
    return newProps;
  }
}

export default LeaguesList;
