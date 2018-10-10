import React, {Component} from 'react';
import MenuItem from './menu-item';

class Menu extends Component {
  constructor({props}) {
    super(props)

    this.state = {
      menuVisible: true,
    }
  }

  render() {
    const menuItems = [
      {id: 'home', label: 'Home', icon: 'home', link: '/home'},
      {id: 'players', label: 'Players', icon: 'user', link: '/players'},
      {id: 'teams', label: 'Teams', icon: 'users', link: '/teams'},
      {id: 'fixtures', label: 'Fixtures', icon: 'gamepad', link: '/fixtures'},
      {id: 'leagues', label: 'Leagues', icon: 'trophy', link: '/leagues'},
    ]
    return (
      <div className={this.state.menuVisible ? "dashboard-menu active" : "dashboard-menu"}>
        <ul>
          {menuItems.map(menuItem => <MenuItem key={menuItem.id} menuItem={menuItem}/>)}
        </ul>
      </div>
    )
  }

  static getDerivedStateFromProps(newProps) {
    return newProps;
  }
}

export default Menu;
