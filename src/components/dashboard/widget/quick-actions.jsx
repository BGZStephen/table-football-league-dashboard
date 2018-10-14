import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class QuickActionsWidget extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="quick-actions-widget">
        <div className="actions-container">
          <div className="row">
            <div className="col col-md-6">
              <button type="button" onClick={this.props.onAddPlayer}>
                <FontAwesomeIcon icon="user" /> Add a player
              </button>
            </div>
            <div className="col col-md-6">
              <button type="button" onClick={this.props.onAddTeam}>
                <FontAwesomeIcon icon="users" /> Add a team
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col col-md-6">
              <button type="button" onClick={this.props.onAddFixture}>
                <FontAwesomeIcon icon="gamepad" /> Add a fixture
            </button>
            </div>
            <div className="col col-md-6">
              <button type="button" onClick={this.props.onAddLeague}>
                <FontAwesomeIcon icon="trophy" /> Add a league
            </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default QuickActionsWidget;
