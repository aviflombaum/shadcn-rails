import { Controller } from "@hotwired/stimulus";

export default class UIFilter extends Controller {
  static targets = ["source", "item"];
  static values = {
    pattern: String,
  };

  connect() {}

  filter(event) {
    let lowerCaseFilterTerm = this.sourceTarget.value.toLowerCase();
    const regex = new RegExp(this.patternValue.replace("{input}", lowerCaseFilterTerm));
    if (this.hasItemTarget) {
      this.itemTargets.forEach((el, i) => {
        let filterableKey = el.innerText.toLowerCase();
        // Check for consecutive characters match using regex
        el.classList.toggle("hidden", !regex.test(filterableKey.trim()));
      });
    }
  }
}
