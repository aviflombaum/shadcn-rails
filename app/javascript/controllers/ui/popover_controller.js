// Inspired by: https://github.com/excid3/tailwindcss-stimulus-components/blob/master/src/popover.js

import { Controller } from "@hotwired/stimulus";
import { createPopper } from "@popperjs/core";

export default class extends Controller {
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
}
