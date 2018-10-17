import React, {Component} from 'react';
import NotificationService from '../../services/notification';

class Notification extends Component {
  constructor(props) {
    super(props)

    this.state = {
      class: null,
      message: '',
      delay: 3000
    }

    this.clearNotificationTimeout = null;

    NotificationService.on('show', (message) => {
      if (this.clearNotificationTimeout) {
        clearTimeout(this.clearNotificationTimeout)
      }

      this.setState({
        class: 'visible success',
        message
      })

      this.clearNotificationTimeout = setTimeout(() => {
        this.setState({
          class: null
        })
      }, this.state.delay)
    })

    NotificationService.on('error', (message) => {
      if (this.clearNotificationTimeout) {
        clearTimeout(this.clearNotificationTimeout)
      }

      this.setState({
        class: 'visible danger',
        message
      })

      this.clearNotificationTimeout = setTimeout(() => {
        this.setState({
          class: null
        })
      }, this.state.delay)
    })
  }

  render() {
    return (
      <div className={this.state.class ? `${this.state.class} notification-service` : "notification-service"}>
        <p>{this.state.message}</p>
      </div>
    )
  }
}

export default Notification;
