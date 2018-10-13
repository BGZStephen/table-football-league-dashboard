import React, {Component} from 'react';
import PlayersListItem from './list-item';

class PlayersList extends Component {
  constructor({props}) {
    super(props)

    this.state = {
      players: [],
      options: false,
    }
  }

  render() {
    return (
      <div className="players-list">
        {this.state.players.map(player => <PlayersListItem key={player._id} player={player} options={this.state.options} onPlayerSelect={(player) => {this.props.onPlayerSelect(player) }}/>)}
      </div>
    )
  }

  static getDerivedStateFromProps(newProps) {
    return newProps;
  }
}

export default PlayersList;
