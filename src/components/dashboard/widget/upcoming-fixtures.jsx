import React, {Component} from 'react';
import ApiService from '../../../services/api';
import NotificationService from '../../../services/notification';
import FixturesList from '../fixtures/list';

class UpcomingFixturesWidget extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fixtures: [],
      playerId: null,
    }

    
  }

  componentDidMount() {
    this.getFixtures();
  }

  render() {
    if (!this.state.fixtures.length) {
      return null;
    }
    return (
      <div className="panel panel-white">
        <div className="panel-title">
            <p>Upcoming fixtures</p>
        </div>
        <div className="upcoming-fixtures">
          <FixturesList fixtures={this.state.fixtures} onFixtureSelect={this.goToFixture}/>
        </div>
      </div>
    )
  }

  getFixtures = () => {
    const query = {
      limit: 5,
      teams: true,
    }

    if (this.state.playerId) {
      query.player = this.state.playerId
    }

    ApiService.fixtures.index({
      query,
    })
      .then(res => {
        this.setState({fixtures: res.data})
      }, err => {
        NotificationService.error(err)
      })
  }

  static getDerivedStateFromProps(newProps) {
    return newProps;
  }

  goToFixture = (fixture) => {
    return;
    this.props.history.push(`/fixtures/${fixture._id}`)
  }
}

export default UpcomingFixturesWidget;
