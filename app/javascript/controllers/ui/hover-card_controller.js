// Inspired by: https://github.com/excid3/tailwindcss-stimulus-components/blob/master/src/popover.js

import { Controller } from "@hotwired/stimulus";
import { createPopper } from "https://ga.jspm.io/npm:@popperjs/core@2.11.8/lib/index.js";
import { useDebounce, useHover } from "https://ga.jspm.io/npm:stimulus-use@0.51.3/dist/index.js";

export default class UIHoverCardController extends Controller {
  static debounces = ["mouseEnter", "mouseLeave"];
  static targets = ["content", "wrapper", "trigger"];

  connect() {
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

  mouseEnter() {
    this.popperInstance.update();
    this.contentTarget.dataset.state = "open";
    this.contentTarget.classList.remove("hidden");
  }

  mouseLeave() {
    this.popperInstance.update();
    this.contentTarget.dataset.state = "closed";
    this.contentTarget.classList.add("hidden");
  }
}
