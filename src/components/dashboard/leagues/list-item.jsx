import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

class TeamsListItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      team: null,
      options: false,
    }

  }

  render() {
    return (
      <div className="leagues-list-item">
        <div className="league-icon">
          <FontAwesomeIcon icon="trophy" />
        </div>
        <a onClick={() => this.props.onLeagueSelect(this.state.league)}>{this.state.league.name}</a>
        <div className="team-icon">
          <FontAwesomeIcon icon="users" />
        </div>
        <p>Teams: {this.state.league.teams.length}</p>
      </div>
    )
  }

  static getDerivedStateFromProps(newProps) {
    return newProps;
  }
}

export default TeamsListItem;
