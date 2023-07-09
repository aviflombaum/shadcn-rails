// Inspired by: https://github.com/excid3/tailwindcss-stimulus-components/blob/master/src/popover.js

import { Controller } from "@hotwired/stimulus";
import { createPopper } from "@popperjs/core";

export default class UIPopover extends Controller {
  static values = {
    dismissAfter: Number,
  };
  static targets = ["content", "wrapper", "trigger"];

  // Sets the popover offset using Stimulus data map objects.

  connect() {
    this.popperInstance = createPopper(this.triggerTarget, this.contentTarget, {
      placement: this.contentTarget.dataset.side || "bottom",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 8],
          },
        },
      ],
    });
  }

  // Show the popover
  show() {
    this.contentTarget.classList.remove("hidden");
    this.contentTarget.dataset.state = "open";
  }

  // Hide the popover
  hide() {
    this.contentTarget.classList.add("hidden");
    this.contentTarget.dataset.state = "closed";
  }

  // Toggle the popover on demand
  toggle(event) {
    this.popperInstance.update();
    if (this.contentTarget.classList.contains("hidden")) {
      this.show();

      if (this.hasDismissAfterValue) {
        setTimeout(() => {
          this.hide();
        }, this.dismissAfterValue);
      }
    } else {
      this.hide();
    }
  }
}
