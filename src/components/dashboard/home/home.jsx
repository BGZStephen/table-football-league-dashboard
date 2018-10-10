import React, {Component} from 'react';

class Home extends Component {
  constructor({props}) {
    super(props)

    this.state = {
      menuVisible: false,
    }
  }

  render() {
    return (
      <div className="dashboard-home">
        <h1>Dashboard Home</h1>
      </div>
    )
  }

  static getDerivedStateFromProps(newProps) {
    return {newProps}
  }
}

export default Home;
