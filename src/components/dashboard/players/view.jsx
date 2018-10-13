import React, {Component} from 'react';
import Breadcrumbs from '../breadcrumbs/breadcrumbs'
import ApiService from '../../../services/api';
import NotificationService from '../../../services/notification';

class PlayerView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      player: {}
    }

    this.fetchPlayer()
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
      {
        label: this.state.player.name ? this.state.player.name.toLowerCase() : undefined,
        link: `/players/${this.state.player._id}`
      },
    ]

    return (
      <div className="players-add full-width-container">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <div className="content-container container-grey">
          
        </div>
      </div>
    )
  }

  fetchPlayer = () => {
    const id = this.props.match.params.id;

    ApiService.players.get({
      params: {
        id,
      }
    })
    .then(res => {
      this.setState({player: res.data})
    }, err => {
      NotificationService.error(err.response.data.message)
    })
  }
}

export default PlayerView;
