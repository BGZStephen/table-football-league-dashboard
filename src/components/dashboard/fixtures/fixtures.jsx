import React, {Component} from 'react';
import Breadcrumbs from '../breadcrumbs/breadcrumbs'
import ApiService from '../../../services/api';
import NotificationService from '../../../services/notification';
import FixturesList from './list';

class Fixtures extends Component {
  constructor({props}) {
    super(props)

    this.state = {
      fixtures: [],
    }

    this.getFixtures();
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
          <div className="row">
            <div className="col col-md-4">
              <div className="panel panel-white">
                <div className="panel-title">Teams</div>
                <div className="fixtures-list-container">
                  <FixturesList fixtures={this.state.fixtures} options={true} onFixtureSelect={this.goToFixture}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  getFixtures = () => {
    ApiService.fixtures.index({
      query: {
        teams: true
      }
    })
      .then(res => {
        this.setState({fixtures: res.data})
      }, err => {
        NotificationService.error(err.response.data.message)
      })
  }

  goToFixture = (fixture) => {
    this.props.history.push(`/fixtures/${fixture._id}`)
  }
}

export default Fixtures;
