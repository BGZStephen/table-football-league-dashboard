import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

class FixturesListItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fixture: {
        teams: []
      },
      options: false,
    }
  }

  render() {
    return (
      <div className="fixtures-list-item">
        <div className="team-icon">
          <FontAwesomeIcon icon="gamepad" />
        </div>
        <a onClick={() => this.props.onFixtureSelect(this.state.fixture)}>{new Date(this.state.fixture.date).toLocaleDateString()}</a>
        <div className="teams-container">
          <p><strong>{this.state.fixture.teams[0].name}</strong></p>
          <p className="team-seperator">VS</p>
          <p><strong>{this.state.fixture.teams[1].name}</strong></p>
        </div>
        {this.state.options ? (
          <div className="actions-container">
            <Link to={`/fixtures/${this.state.fixture._id}/edit`}>
              <div className="action">
                <FontAwesomeIcon icon="pencil-alt" />
              </div>
            </Link>
            <div className="action">
              <FontAwesomeIcon icon="trash" />
            </div>
          </div>
        ): null}
      </div>
    )
  }

  static getDerivedStateFromProps(newProps) {
    return newProps;
  }
}

export default FixturesListItem;
