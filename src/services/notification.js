class NotificationService {
  hideTimer = null;

  show(message, delay = 3000) {
    const el = document.getElementById('notification-service');
    el.innerHTML = `<p>${message}</p>`;
    el.classList.add('visible', 'success');

    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
    }
    this.hideTimer = setTimeout(this.hide, delay);
  }

  error(message, delay = 3000) {
    const el = document.getElementById('notification-service');
    el.innerHTML = `<p>${message}</p>`;
    el.classList.add('visible', 'danger');

    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
    }
    this.hideTimer = setTimeout(this.hide, delay);
  }

  hide() {
    const el = document.getElementById('notification-service');
    el.classList.remove('visible', 'danger', 'success');
    setTimeout(() => {
      el.innerHTML = '';
    }, 400);
  }
}

export default new NotificationService();