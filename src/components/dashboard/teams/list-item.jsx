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
      <div className="teams-list-item">
        <div className="team-icon">
          <FontAwesomeIcon icon="users" />
        </div>
        <a onClick={() => this.props.onTeamSelect(this.state.team)}>{this.state.team.name}</a>
        <div className="players">
          <Link to={`/players/${this.state.team.players[0]._id}`}>
          <div className="player">
            <div className="player-icon">
              <FontAwesomeIcon icon="user" fixedWidth />
            </div>
            <p>{this.state.team.players[0].name}</p>
          </div>
          </Link>
          <Link to={`/players/${this.state.team.players[1]._id}`}>
            <div className="player">
              <div className="player-icon">
                <FontAwesomeIcon icon="user" fixedWidth />
              </div>
              <p>{this.state.team.players[1].name}</p>
            </div>
          </Link>
        </div>
        {this.state.options ? (
          <div className="actions-container">
            <Link to={`/teams/${this.state.team._id}/edit`}>
              <div className="action">
                <FontAwesomeIcon icon="pencil-alt" />
              </div>
            </Link>
            <div className="action">
              <FontAwesomeIcon icon="trash" />
            </div>
          </div>
        ): null}
      </div>
    )
  }

  static getDerivedStateFromProps(newProps) {
    return newProps;
  }
}

export default TeamsListItem;
