import React, {Component} from 'react';
import ApiService from '../../../services/api';
import NotificationService from '../../../services/notification';
import Breadcrumbs from '../breadcrumbs/breadcrumbs'

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
        
        </div>
      </div>
    )
  }

  getPlayers = () => {
    ApiService.players.index()
    .then(res => {
      console.log(res)
    }, err => {
      NotificationService.error(err.response.data.message)
    })
  }
}

export default Players;
