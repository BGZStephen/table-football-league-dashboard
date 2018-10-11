import React, {Component} from 'react';
import Breadcrumbs from '../breadcrumbs/breadcrumbs'

class FixturesAdd extends Component {
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
      {
        label: 'add',
        link: '/fixtures/add'
      },
    ]

    return (
      <div className="fixtures-add full-width-container">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <div className="content-container container-grey">

        </div>
      </div>
    )
  }
}

export default FixturesAdd;
