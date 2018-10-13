import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

class MenuItem extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <li className="menu-item">
        <NavLink activeClassName='active' to={this.props.menuItem.link}>
          <div className="icon-container">
            <FontAwesomeIcon icon={this.props.menuItem.icon} fixedWidth />
          </div>
          <span>{this.props.menuItem.label}</span>
        </NavLink>
      </li>
    )
  }
}

export default MenuItem;
