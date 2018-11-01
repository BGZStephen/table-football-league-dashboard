import { EventEmitter } from "events";

class NotificationService {
  constructor() {
    this.eventEmitter = new EventEmitter()
  }

  on = (eventName, listener) => {
    this.eventEmitter.on(eventName, listener); 
  }

  show = (message) => {
    this.eventEmitter.emit('show', message)
  }

  error = (err) => {
    if (typeof err === 'string') {
      this.eventEmitter.emit('error', err)
      return;
    }

    if (err && err.response && err.response.data && err.response.data.message) {
      this.eventEmitter.emit('error', err.response.data.message)
      return;
    }

    this.eventEmitter.emit('error', 'Something went wrong, please try again')
  }
}

const instance = new NotificationService()
Object.freeze(instance);

export default instance;