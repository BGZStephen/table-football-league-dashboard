import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class MobileTopNav extends Component {
  render() {
    return (
      <div className="mobile-top-nav">
        <div className="menu-toggle-container">
          <FontAwesomeIcon icon="bars" fixedWidth />
        </div>
      </div>
    )
  }
}

export default MobileTopNav;
