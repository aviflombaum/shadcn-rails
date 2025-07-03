// Inspired by https://github.com/kanety/stimulus-dialog
import { Controller } from "@hotwired/stimulus";
import "https://ga.jspm.io/npm:@kanety/stimulus-static-actions@1.0.1/dist/index.modern.js";

export default class UIDialog extends Controller {
  static targets = ["dialog", "modal", "focus", "drag", "backdrop", "closeButton", "content"];
  static actions = [
    ["element", "keydown@window->closeByKey"],
    ["modal", "click->closeByModal"],
    ["closeButton", "click->close"],
  ];

  initialize() {}
  connect() {}
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

  handleFocusEvent(e) {
    let target = this.dialogTarget;
    let shiftPressed = e.shiftKey;
    // If TAB is pressed
    if (e.keyCode === 9) {
      let focusableElements = target.querySelectorAll("a[href], button");
      let borderElem = shiftPressed
        ? focusableElements[0]
        : focusableElements[focusableElements.length - 1];
      if (document.activeElement === borderElem) {
        e.preventDefault();
      }
    }
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
    this.toggleElements(true);
    if (this.hasFocusTarget) {
      this.focusTarget.focus();
    }

    this.dispatch("opened", { detail: { target: target } });
  }

  closeBy(target) {
    this.toggleElements(false);
    if (target.getAttribute('data-ui--dialog-target') === 'modal') {
      document.body.classList.remove("overflow-hidden");
    }
    this.dispatch("closed", { detail: { target: target } });
  }

  toggleElements(visible, { dialog, modal, backdrop, content, body = document.body } = {}) {
    // Use provided elements or fall back to targets
    const dialogEl = dialog || (this.hasDialogTarget ? this.dialogTarget : null);
    const modalEl = modal || (this.hasModalTarget ? this.modalTarget : null);
    const backdropEl = backdrop || (this.hasBackdropTarget ? this.backdropTarget : null);
    const contentEl = content || (this.hasContentTarget ? this.contentTarget : null);

    // Handle body overflow
    if (body) {
      body.classList.toggle("overflow-hidden", visible);
    }
    
    // Handle content scrolling
    if (contentEl) {
      contentEl.classList.toggle("overflow-y-scroll", visible);
      contentEl.classList.toggle("h-full", visible);
    }
    
    // Handle dialog visibility
    if (dialogEl) {
      dialogEl.classList.toggle("hidden", !visible);
      dialogEl.dataset.state = visible ? "open" : "closed";
    }
    
    // Handle modal visibility
    if (modalEl) {
      modalEl.classList.toggle("hidden", !visible);
      modalEl.dataset.state = visible ? "open" : "closed";
    }
    
    // Handle backdrop visibility
    if (backdropEl) {
      backdropEl.classList.toggle("hidden", !visible);
      backdropEl.dataset.state = visible ? "open" : "closed";
    }
  }

  // Legacy method for backward compatibility?
  toggleClass(visible) {
    this.toggleElements(visible);
  }
}