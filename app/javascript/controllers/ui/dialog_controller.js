// Inspired by https://github.com/kanety/stimulus-dialog
import { Controller } from "@hotwired/stimulus";
import "@kanety/stimulus-static-actions";

export default class extends Controller {
  static targets = ["dialog", "modal", "focus", "drag", "backdrop"];
  static actions = [
    ["element", "keydown@window->closeByKey"],
    ["modal", "click->closeByModal"],
  ];

  initialize() {}
  connect() {
    console.log("hello");
  }
  open(e) {
    this.openBy(e.target);
    e.preventDefault();
  }

  close(e) {
    this.closeBy(e.target);
    e.preventDefault();
  }

  toggle(e) {
    if (this.isVisible()) {
      this.closeBy(e.target);
    } else {
      this.openBy(e.target);
    }
    e.preventDefault();
  }

  closeByKey(e) {
    if (e.keyCode == 27) {
      this.closeBy(e.target);
      e.preventDefault();
    }
  }

  closeByModal(e) {
    if (!this.dialogTarget.contains(e.target)) {
      this.closeBy(e.target);
    }
  }

  isVisible() {
    return this.dialogTarget.classList.contains("st-dialog--visible");
  }

  openBy(target) {
    this.toggleClass(true);

    if (this.hasFocusTarget) {
      this.focusTarget.focus();
    }

    this.dispatch("opened", { detail: { target: target } });
  }

  closeBy(target) {
    this.toggleClass(false);

    this.dispatch("closed", { detail: { target: target } });
  }

  toggleClass(visible) {
    if (visible) {
      this.dialogTarget.classList.remove("hidden");
      this.dialogTarget.dataset.state = "open";
      this.backdropTarget.classList.remove("hidden");
      this.backdropTarget.dataset.state = "open";
      if (this.hasModalTarget) {
        this.modalTarget.classList.add("st-dialog-modal--visible");
        document.body.classList.add("st-dialog--disable-scroll");
      }
    } else {
      this.dialogTarget.classList.add("hidden");
      this.dialogTarget.dataset.state = "closed";
      this.backdropTarget.classList.add("hidden");
      this.backdropTarget.dataset.state = "closed";
      if (this.hasModalTarget) {
        this.modalTarget.classList.remove("st-dialog-modal--visible");
        document.body.classList.remove("st-dialog--disable-scroll");
      }
    }
  }
}
