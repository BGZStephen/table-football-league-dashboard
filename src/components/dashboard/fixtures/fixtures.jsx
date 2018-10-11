import React, {Component} from 'react';
import Breadcrumbs from '../breadcrumbs/breadcrumbs'

class Fixtures extends Component {
  constructor({props}) {
    super(props)
  }

  render() {
    const breadcrumbs = [
      {
        label: 'dashboard',
      },
      {
        label: 'fixtures',
        link: '/fixtures'
      },
    ]

    return (
      <div className="fixtures full-width-container">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <div className="content-container container-grey">
        
        </div>
      </div>
    )
  }
}

export default Fixtures;
