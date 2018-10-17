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

  error = (message, delay = 3000) => {
    this.eventEmitter.emit('error', message)
  }
}

const instance = new NotificationService()
Object.freeze(instance);

export default instance;