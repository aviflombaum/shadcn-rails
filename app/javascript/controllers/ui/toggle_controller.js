// Inspired by: https://github.com/excid3/tailwindcss-stimulus-components/blob/master/src/popover.js

import { Controller } from "@hotwired/stimulus";

export default class UIToggleController extends Controller {
  connect() {}

  toggle() {
    if (this.element.dataset.state == "on") {
      this.element.dataset.state = "off";
    } else {
      this.element.dataset.state = "on";
    }
  }
}
