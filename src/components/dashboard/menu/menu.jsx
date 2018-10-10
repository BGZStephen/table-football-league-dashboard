import React, {Component} from 'react';

class Menu extends Component {
  constructor({props}) {
    super(props)

    this.state = {
      menuVisible: true,
    }

    setInterval(() => {
      console.log(this.state)
    })
  }

  render() {
    return (
      <div className={this.state.menuVisible ? "dashboard-menu active" : "dashboard-menu"}>
      </div>
    )
  }

  static getDerivedStateFromProps(newProps) {
    return newProps;
  }
}

export default Menu;
