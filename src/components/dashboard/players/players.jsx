import React, {Component} from 'react';
import Breadcrumbs from '../breadcrumbs/breadcrumbs'

class Players extends Component {
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
    ]

    return (
      <div className="dashboard-home">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <div className="content-container container-grey">
        
        </div>
      </div>
    )
  }
}

export default Players;
