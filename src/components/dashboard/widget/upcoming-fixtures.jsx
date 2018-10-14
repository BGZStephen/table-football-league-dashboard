import React, {Component} from 'react';
import ApiService from '../../../services/api';
import NotificationService from '../../../services/notification';
import FixturesList from '../fixtures/list';

class UpcomingFeaturesWidget extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fixtures: [],
    }

    this.getFixtures();
  }

  render() {
    return (
      <div className="upcoming-fixtures">
        <FixturesList fixtures={this.state.fixtures}/>
      </div>
    )
  }

  getFixtures = () => {
    ApiService.fixtures.index({
      query: {
        limit: 5,
        teams: true,
      }
    })
      .then(res => {
        this.setState({fixtures: res.data})
      }, err => {
        NotificationService.error(err.response.data.message)
      })
  }
}

export default UpcomingFeaturesWidget;
