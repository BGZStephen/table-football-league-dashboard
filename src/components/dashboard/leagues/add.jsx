import React, {Component} from 'react';
import Breadcrumbs from '../breadcrumbs/breadcrumbs'

class LeaguesAdd extends Component {
  constructor({props}) {
    super(props)
  }

  render() {
    const breadcrumbs = [
      {
        label: 'dashboard',
      },
      {
        label: 'leagues',
        link: '/leagues'
      },
      {
        label: 'add',
        link: '/leagues/add'
      },
    ]

    return (
      <div className="leagues-add full-width-container">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <div className="content-container container-grey">

        </div>
      </div>
    )
  }
}

export default LeaguesAdd;
