import React, {Component} from 'react';
import Breadcrumbs from '../breadcrumbs/breadcrumbs'
import ApiService from '../../../services/api';
import NotificationService from '../../../services/notification';

class TeamView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      team: {}
    }

    this.fetchTeam()
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
        label: this.state.team.name ? this.state.team.name.toLowerCase() : undefined,
        link: `/teams/${this.state.team._id}`
      },
    ]

    return (
      <div className="team-view full-width-container">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <div className="content-container container-grey">
          
        </div>
      </div>
    )
  }

  fetchTeam = () => {
    const id = this.props.match.params.id;

    ApiService.teams.get({
      params: {
        id,
      },
      query: {
        players: true,
      }
    })
    .then(res => {
      this.setState({team: res.data})
    }, err => {
      NotificationService.error(err.response.data.message)
    })
  }
}

export default TeamView;
