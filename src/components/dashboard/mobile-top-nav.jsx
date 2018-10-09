import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Logo from '../logo/logo';

class MobileTopNav extends Component {
  render() {
    return (
      <div className="mobile-top-nav">
        <div className="menu-toggle-container">
          <FontAwesomeIcon icon="bars" fixedWidth />
        </div>
        <Logo />
      </div>
    )
  }
}

export default MobileTopNav;
