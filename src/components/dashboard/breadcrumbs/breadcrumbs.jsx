import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

class Breadcrumbs extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <div className="breadcrumbs">
        {
          this.props.breadcrumbs.map((breadcrumb, index) => {
            return (
              <span>
                {
                  breadcrumb.link ? 
                  <NavLink exact={true} to={breadcrumb.link}>
                    {breadcrumb.label}
                  </NavLink> :
                  <p>{breadcrumb.label}</p>
                }
                {index < (this.props.breadcrumbs.length - 1) ? <i className="breadcrumb-seperator">/</i> : null}
              </span>
            )
          })
        }
      </div>
    )
  }
}

export default Breadcrumbs;
