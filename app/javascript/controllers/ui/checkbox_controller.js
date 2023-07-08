import { Controller } from "@hotwired/stimulus";
export default class extends Controller {
  connect() {
    this.button = this.element.querySelector("button");
    this.checkmark = this.button.querySelector("span");
  }

  toggle() {
    if (this.checkmark.classList.contains("hidden")) {
      this.checkmark.classList.remove("hidden");
      this.button.dataset.state = "checked";
    } else {
      this.checkmark.classList.add("hidden");
      this.button.dataset.state = "unchecked";
    }
  }
}
