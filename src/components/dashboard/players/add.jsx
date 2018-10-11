import React, {Component} from 'react';
import Breadcrumbs from '../breadcrumbs/breadcrumbs'

class PlayersAdd extends Component {
  constructor({props}) {
    super(props)
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
        label: 'add',
        link: '/players/add'
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
}

export default PlayersAdd;
