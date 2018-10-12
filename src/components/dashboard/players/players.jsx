import React, {Component} from 'react';
import ApiService from '../../../services/api';
import NotificationService from '../../../services/notification';
import Breadcrumbs from '../breadcrumbs/breadcrumbs'
import PlayersList from './list';

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
          <div class="row">
            <div class="col col-md-6">
              <div class="panel panel-white">
                <div class="players-list-container">
                  <PlayersList players={this.state.players} />
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
}

export default Players;
