import React, {Component} from 'react';
import PlayersListItem from './list-item';

class PlayersList extends Component {
  constructor({props}) {
    super(props)

    this.state = {
      players: [],
    }
  }

  render() {
    return (
      <div className="players-list">
        {this.state.players.map(player => <PlayersListItem player={player} />)}
      </div>
    )
  }

  static getDerivedStateFromProps(newProps) {
    return newProps;
  }
}

export default PlayersList;
