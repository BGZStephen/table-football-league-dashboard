import React, { Component } from 'react';

class Menu extends Component {
  constructor({props}) {
    super(props)

    this.state = {
      menuVisible: false,
    }
  }

  render() {
    return (
      <div className="dashboard-menu">
      </div>
    )
  }

  static getDerivedStateFromProps(newProps) {
    return {newProps}
  }
}

export default Menu;
