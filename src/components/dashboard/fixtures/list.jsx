import React, {Component} from 'react';
import FixturesListItem from './list-item';

class FixturesList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fixtures: [],
      options: false,
    }

    console.log(this.props)
  }

  render() {
    return (
      <div className="fixtures-list">
        {this.state.fixtures.map((fixture) => <FixturesListItem key={fixture._id} fixture={fixture} options={this.state.options} onFixtureSelect={fixture => this.props.onFixtureSelect(fixture) }/>)}
      </div>
    )
  }

  static getDerivedStateFromProps(newProps) {
    return newProps;
  }
}

export default FixturesList;
