// Inspired by: https://github.com/excid3/tailwindcss-stimulus-components/blob/master/src/popover.js

import { Controller } from "@hotwired/stimulus";

export default class UIToggleController extends Controller {
  connect() {}

  toggle() {
    const button = this.element.querySelector("button");
    const span = this.element.querySelector("span");
    const input = this.element.querySelector("input[type='hidden']");

    if (this.element.dataset.state == "checked") {
      input.value = "unchecked";
      button.dataset.state = "unchecked";
      span.dataset.state = "unchecked";
      this.element.dataset.state = "unchecked";
    } else {
      input.value = "checked";
      button.dataset.state = "checked";
      span.dataset.state = "checked";
      this.element.dataset.state = "checked";
    }
  }
}
