import { Controller } from "@hotwired/stimulus";

export default class UIToastController extends Controller {
  static targets = ["item"];

  connect() {
    setTimeout(() => {
      this.openAll();
    }, 1000);

    this.closeAll();
  }

  openAll() {
    const toastElements = document.querySelectorAll("[data-ui--toast-target='item']");
    toastElements.forEach((toastElement) => {
      toastElement.dataset.state = "open";
      toastElement.classList.remove("hidden");
    });
  }

  closeAll() {
    const toastElements = document.querySelectorAll("[data-ui--toast-target='item']");
    toastElements.forEach((toastElement) => {
      setTimeout(() => {
        toastElement.dataset.state = "closed";
        toastElement.classList.add("hidden");
      }, toastElement.dataset.duration);
    });
  }

  test() {
    const $this = this;
    this.closeAll();
    setTimeout(() => {
      $this.openAll();
      setTimeout(() => {
        $this.closeAll();
      }, 3000);
    }, 1000);
  }
  close() {}
}
