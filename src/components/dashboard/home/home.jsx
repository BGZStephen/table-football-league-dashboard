import React, {Component} from 'react';
import Breadcrumbs from '../breadcrumbs/breadcrumbs'
import QuickActions from '../widget/quick-actions';

class Home extends Component {
  constructor({props}) {
    super(props)
  }

  render() {
    const breadcrumbs = [
      {
        label: 'dashboard',
      },
      {
        label: 'home',
        link: '/home'
      },
    ]

    return (
      <div className="dashboard-home full-width-container">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <div className="content-container container-grey">
          <div className="row">
            <div className="col col-sm-3">
              <div className="panel panel-white">
                <QuickActions
                  onAddLeague={this.onAddLeague}
                  onAddPlayer={this.onAddPlayer}
                  onAddFixture={this.onAddFixture}
                  onAddTeam={this.onAddTeam}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  onAddPlayer = () => {
    this.goTo('/players/add');
  }

  onAddFixture = () => {
    this.goTo('/fixtures/add');
  }

  onAddTeam = () => {
    this.goTo('/teams/add');
  }

  onAddLeague = () => {
    this.goTo('/leagues/add');
  }

  goTo = (path) => {
    this.props.history.push(path)
  }
}

export default Home;
