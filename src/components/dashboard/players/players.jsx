import React, {Component} from 'react';
import ApiService from '../../../services/api';
import NotificationService from '../../../services/notification';
import Breadcrumbs from '../breadcrumbs/breadcrumbs'
import PlayersList from './list';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class Players extends Component {
  constructor({props}) {
    super(props)

    this.state = {
      players: [],
    }

    this.getPlayers();
  }

  render() {
    const breadcrumbs = [
      {
        label: 'dashboard',
      },
      {
        label: 'players',
        link: '/players'
      },
    ]

    return (
      <div className="players full-width-container">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <div className="content-container container-grey">
          <div className="row">
            <div className="col col-md-3">
              <div className="panel panel-white">
                <div className="panel-title">Players</div>
                <div className="players-list-container">
                  <PlayersList players={this.state.players} options={true} onPlayerSelect={(player) => this.goToPlayer(player)}/>
                </div>
                <div className="actions-container">
                  <button type="button" onClick={this.onAddPlayer}>
                    <FontAwesomeIcon icon="user" /> Add a player
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  getPlayers = () => {
    ApiService.players.index()
      .then(res => {
        this.setState({players: res.data})
      }, err => {
        NotificationService.error(err.response.data.message)
      })
  }

  goToPlayer(player) {
    this.props.history.push(`/players/${player._id}`);
  }

  onAddPlayer = () => {
    this.goTo('/players/add');
  }
}

export default Players;
