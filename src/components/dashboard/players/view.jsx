import React, {Component} from 'react';
import Breadcrumbs from '../breadcrumbs/breadcrumbs'
import ApiService from '../../../services/api';
import NotificationService from '../../../services/notification';
import PlayerSummaryWidget from '../widget/player-summary';
import UpcomingFixturesWidget from '../widget/upcoming-fixtures';
import {withRouter} from "react-router";

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

    if (!this.state.player.name) {
      return null
    }

    return (
      <div className="players-add full-width-container">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <div className="content-container container-grey">
          <div className="row">
            <div className="col col-lg-3">
              <PlayerSummaryWidget player={this.state.player} />
            </div>
            <div className="col col-lg-3">
              <UpcomingFixturesWidget playerId={this.state.player._id} />
            </div>
          </div>
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

export default withRouter(PlayerView);
