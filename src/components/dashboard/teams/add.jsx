import React, {Component} from 'react';
import Breadcrumbs from '../breadcrumbs/breadcrumbs'

class TeamsAdd extends Component {
  constructor({props}) {
    super(props)
  }

  render() {
    const breadcrumbs = [
      {
        label: 'dashboard',
      },
      {
        label: 'teams',
        link: '/teams'
      },
      {
        label: 'add',
        link: '/teams/add'
      },
    ]

    return (
      <div className="teams-add full-width-container">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <div className="content-container container-grey">

        </div>
      </div>
    )
  }
}

export default TeamsAdd;
