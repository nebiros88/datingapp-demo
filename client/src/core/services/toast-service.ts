import { Injectable } from '@angular/core';

const TOAST_CONTAINER_ID = 'toast-container';
const TOAST_ALERTS = {
  SUCCESS: 'alert-success',
  ERROR: 'alert-error',
  WARNING: 'alert-warning',
  INFO: 'alert-info',
};
const TOAST_DEFAULT_DURATION = 5000;

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor() {
    this.createToastContainer();
  }

  private createToastContainer() {
    if (!document.getElementById(TOAST_CONTAINER_ID)) {
      const container = document.createElement('div');
      container.id = TOAST_CONTAINER_ID;
      container.className = 'toast toast-bottom toast-end';
      document.body.appendChild(container);
    }
  }

  private createToastElement(
    message: string,
    alertClass: string,
    duration = TOAST_DEFAULT_DURATION
  ) {
    const toastContainer = document.getElementById(TOAST_CONTAINER_ID);

    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.classList.add('alert', alertClass, 'shadow-lg');
    toast.innerHTML = `
      <span>${message}</span>
      <button class="ml-4 btn-sm btn-ghost">x</button>
    `;

    toast.querySelector('button')?.addEventListener('click', () => {
      toastContainer.removeChild(toast);
    });

    toastContainer.append(toast);

    setTimeout(() => {
      toastContainer.removeChild(toast);
    }, duration);
  }

  success(message: string, duration?: number) {
    this.createToastElement(message, TOAST_ALERTS.SUCCESS, duration);
  }

  error(message: string, duration?: number) {
    this.createToastElement(message, TOAST_ALERTS.ERROR, duration);
  }

  warning(message: string, duration?: number) {
    this.createToastElement(message, TOAST_ALERTS.WARNING, duration);
  }

  info(message: string, duration?: number) {
    this.createToastElement(message, TOAST_ALERTS.INFO, duration);
  }
}
