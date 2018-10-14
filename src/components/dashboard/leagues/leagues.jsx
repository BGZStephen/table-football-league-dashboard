import React, {Component} from 'react';
import Breadcrumbs from '../breadcrumbs/breadcrumbs'
import ApiService from '../../../services/api';
import NotificationService from '../../../services/notification';
import LeaguesList from './list';

class Leagues extends Component {
  constructor({props}) {
    super(props)

    this.state = {
      leagues: [],
    }

    this.getLeagues();
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
    ]

    return (
      <div className="leagues full-width-container">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <div className="content-container container-grey">
          <div className="row">
            <div className="col col-md-4">
              <div className="panel panel-white">
                <div className="panel-title">Leagues</div>
                <div className="leagues-list-container">
                  <LeaguesList leagues={this.state.leagues} options={true} onLeagueSelect={this.goToLeague}/>
                </div>
              </div>
            </div>
          </div>   
        </div>
      </div>
    )
  }

  getLeagues = () => {
    ApiService.leagues.index()
      .then(res => {
        this.setState({leagues: res.data})
      }, err => {
        NotificationService.error(err.response.data.message)
      })
  }

  goToLeague = (league) => {
    this.props.history.push(`/leagues/${league._id}`)
  }
}

export default Leagues;
