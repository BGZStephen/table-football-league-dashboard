import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class PlayerSummaryWidget extends Component {
  constructor(props) {
    super(props)

    this.state = {
      player: {},
    }
  }

  render() {
    if (!this.state.player.name) {
      return null;
    }

    return (
      <div className="panel panel-white">
        <div className="panel-title">
          <p>Player details</p>
        </div>
        <div className="player-summary-widget">
          <div className="summary-group">
            <p className="group-label">Name</p>
            <p>{this.state.player.name}</p>
          </div>
          <div className="summary-group">
            <p className="group-label">Positions</p>
            <div className="positions-container">
              {
                this.state.player.position.defender ? (
                <div className="position defender">
                  <FontAwesomeIcon icon="shield-alt" />
                  <p>Defender</p>
                </div>
              ): null}
              {
                this.state.player.position.striker ? (
                <div className="position striker">
                  <FontAwesomeIcon icon="crosshairs" />
                  <p>Striker</p>
                </div>
              ): null}
            </div>
          </div>
        </div>
      </div>
    )
  }

  static getDerivedStateFromProps(newProps) {
    return newProps;
  }
}

export default PlayerSummaryWidget;
