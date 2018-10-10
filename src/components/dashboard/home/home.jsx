import React, {Component} from 'react';
import Breadcrumbs from '../breadcrumbs/breadcrumbs'

class Home extends Component {
  constructor({props}) {
    super(props)
  }

  render() {
    const breadcrumbs = [
      {
        label: 'home',
        link: '/home'
      },
      {
        label: 'home',
      },
      {
        label: 'home',
        link: '/home'
      },
      {
        label: 'home',
      },
    ]

    return (
      <div className="dashboard-home">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>
    )
  }
}

export default Home;
