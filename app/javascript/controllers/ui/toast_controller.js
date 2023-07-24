import { Controller } from "@hotwired/stimulus";

export default class UIToastController extends Controller {
  static targets = ["item"];

  connect() {
    if (this.element.role == "region" && this.element.dataset.auto != "false") {
      setTimeout(() => {
        this.open();
      }, 1000);
      this.close();
    }
  }

  open() {
    const toastElement = this.element.querySelector("[data-ui--toast-target='item']");
    this.element.dataset.state = "open";
    this.element.classList.remove("hidden");
    this.showToast(toastElement);
  }

  close() {
    const toastElement = this.element.querySelector("[data-ui--toast-target='item']");
    this.element.dataset.state = "closed";
    this.element.classList.add("hidden");
    this.closeToast(toastElement);
  }

  showToast(el) {
    if (el) {
      el.dataset.state = "open";
      el.classList.remove("hidden");
    }
  }

  closeToast(el) {
    if (el) {
      setTimeout(() => {
        el.dataset.state = "closed";
        el.classList.add("hidden");
      }, el.dataset.duration || 3000);
    }
  }

  trigger() {
    const idTarget = this.element.dataset.target;
    const toastContainer = document.querySelector(`${idTarget}`);
    toastContainer.dataset.state = "open";
    toastContainer.classList.remove("hidden");
    const toastElement = toastContainer.querySelector("[data-ui--toast-target='item']");
    this.showToast(toastElement);
    this.closeToast(toastElement);
  }

  openAll() {
    const toastElements = document.querySelectorAll(
      "[data-ui--toast-target='item']:not([data-visible='false'])",
    );
    toastElements.forEach((toastElement) => {
      this.showToast(toastElement);
    });
  }

  closeAll() {
    const toastElements = document.querySelectorAll("[data-ui--toast-target='item']");
    toastElements.forEach((toastElement) => {
      this.closeToast(toastElement);
    });
  }
}
