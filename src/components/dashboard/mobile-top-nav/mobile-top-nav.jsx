import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Logo from '../../logo/logo';

class MobileTopNav extends Component {
  constructor({props}) {
    super(props)
  }

  render() {
    return (
      <div className="mobile-top-nav">
        <div className="menu-toggle-container" onClick={() => this.props.onMenuToggle()}>
          <FontAwesomeIcon icon="bars" fixedWidth />
        </div>
        <Logo />
      </div>
    )
  }
}

export default MobileTopNav;
