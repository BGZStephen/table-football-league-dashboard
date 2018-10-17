import React, {Component} from 'react';
import NotificationService from '../../services/notification';

class Notification extends Component {
  render() {
    NotificationService.on('show', () => {
      console.log('working')
    })

    return (
      <div className="notification-service" />
    )
  }
}

export default Notification;
