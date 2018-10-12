import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class PlayersListItem extends Component {
  constructor({props}) {
    super(props)

    this.state = {
      player: null,
    }

  }

  render() {
    return (
      <div className="players-list-item">
        <div className="positions-container">
          {this.state.player.position.striker ? (
            <div className="position striker">
              <FontAwesomeIcon icon="crosshairs" />
              <p>Striker</p>
            </div>
          ) : null}
          {this.state.player.position.defender ? (
            <div className="position defender">
              <FontAwesomeIcon icon="shield-alt" />
              <p>Defender</p>
            </div>
          ) : null}
        </div>
      </div>
    )
  }

  static getDerivedStateFromProps(newProps) {
    return newProps;
  }
}

export default PlayersListItem;
