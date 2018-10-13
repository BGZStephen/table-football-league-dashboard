import React, {Component} from 'react';
import ApiService from '../../../services/api';
import NotificationService from '../../../services/notification';
import PlayersList from '../players/list';

class PlayerSelectModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      players: [],
    }

    this.getPlayers();
  }

  render() {
    return (
      <div className={this.state.visible ? "player-select-modal modal visible" : "player-select-modal modal"} onClick={this.backgroundClick}>
        <div className="modal-content">
          <div className="panel panel-white">
            <div className="panel-title">
              <p>Select a player</p>
            </div>
            <div className="players-list-container">
              <PlayersList players={this.state.players} options={false} onPlayerSelect={this.props.onPlayerSelect}/>
            </div>
          </div>
        </div>
      </div>
    )
  }

  static getDerivedStateFromProps(newProps) {
    return newProps;
  }

  getPlayers = () => {
    ApiService.players.index()
      .then(res => {
        this.setState({players: res.data})
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

export default PlayerSelectModal;
