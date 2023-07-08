// Inspired by: https://github.com/excid3/tailwindcss-stimulus-components/blob/master/src/popover.js

import { Controller } from "@hotwired/stimulus";
import { createPopper } from "@popperjs/core";
import { useDebounce } from "stimulus-use";
import { useHover } from "stimulus-use";

export default class UIHoverCardController extends Controller {
  static debounces = ["mouseEnter", "mouseLeave"];

  static values = {
    dismissAfter: Number,
  };
  static targets = ["content", "wrapper", "trigger"];

  // Sets the popover offset using Stimulus data map objects.

  connect() {
    console.log("hi");
    useDebounce(this);
    useHover(this, { element: this.triggerTarget });
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
  mouseEnter() {
    this.popperInstance.update();
    this.contentTarget.classList.remove("hidden");
    this.contentTarget.dataset.state = "open";
  }

  // Hide the popover
  mouseLeave() {
    this.popperInstance.update();

    this.contentTarget.classList.add("hidden");
    this.contentTarget.dataset.state = "closed";
  }

  // Toggle the popover on demand
  toggle(event) {
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
