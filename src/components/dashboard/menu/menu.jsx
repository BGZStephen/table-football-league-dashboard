import React, {Component} from 'react';
import MenuItem from './menu-item';
import Logo from '../../logo/logo';

class Menu extends Component {
  constructor({props}) {
    super(props)

    this.state = {
      menuVisible: true,
    }
  }

  render() {
    const menuItems = [
      {id: 'home', label: 'Home', icon: 'home', link: '/dashboard/home'},
      {id: 'players', label: 'Players', icon: 'user', link: '/dashboard/players'},
      {id: 'teams', label: 'Teams', icon: 'users', link: '/dashboard/teams'},
      {id: 'fixtures', label: 'Fixtures', icon: 'gamepad', link: '/dashboard/fixtures'},
      {id: 'leagues', label: 'Leagues', icon: 'trophy', link: '/dashboard/leagues'},
    ]
    return (
      <div className={this.state.menuVisible ? "dashboard-menu active" : "dashboard-menu"}>
        <div className="logo-container">
          <Logo />
        </div>
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
