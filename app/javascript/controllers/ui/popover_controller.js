// Inspired by: https://github.com/excid3/tailwindcss-stimulus-components/blob/master/src/popover.js

import { Controller } from "@hotwired/stimulus";
import { createPopper } from "https://ga.jspm.io/npm:@popperjs/core@2.11.8/lib/index.js";
import { useClickOutside } from "https://ga.jspm.io/npm:stimulus-use@0.51.3/dist/index.js";

export default class UIPopover extends Controller {
  static values = {
    dismissAfter: Number,
  };
  static targets = ["content", "wrapper", "trigger"];

  connect() {
    useClickOutside(this);
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

  clickOutside(event) {
    this.hide();
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
