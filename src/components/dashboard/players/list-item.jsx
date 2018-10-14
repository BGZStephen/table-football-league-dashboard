import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

class PlayersListItem extends Component {
  constructor({props}) {
    super(props)

    this.state = {
      player: null,
      options: false,
    }

  }

  render() {
    return (
      <div className="players-list-item">
        <div className="positions-container">
          {this.state.player.position.striker ? (
            <div className="position striker">
              <FontAwesomeIcon icon="crosshairs" />
            </div>
          ) : null}
          {this.state.player.position.defender ? (
            <div className="position defender">
              <FontAwesomeIcon icon="shield-alt" />
            </div>
          ) : null}
        </div>
        <a onClick={() => this.props.onPlayerSelect(this.state.player)}>{this.state.player.name}</a>
        {this.state.options ? (
          <div className="actions-container">
            <Link to={`/players/${this.state.player._id}/edit`}>
              <div className="action">
                <FontAwesomeIcon icon="pencil-alt" />
              </div>
            </Link>
          </div>
        ): null}
      </div>
    )
  }

  static getDerivedStateFromProps(newProps) {
    return newProps;
  }
}

export default PlayersListItem;
