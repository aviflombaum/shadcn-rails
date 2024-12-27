import { Controller } from "@hotwired/stimulus";

export default class UIFilter extends Controller {
  static targets = ["source", "item"];
  static values = {
    mode: String,
  };

  connect() {}

  filter(event) {
    let lowerCaseFilterTerm = this.sourceTarget.value.toLowerCase();
    if (this.hasItemTarget) {
      this.itemTargets.forEach((el, i) => {
        let filterableKey = el.innerText.toLowerCase();
        const shouldToggle =
          this.modeValue === "includes"
            ? !filterableKey.trim().includes(lowerCaseFilterTerm)
            : !filterableKey.trim().startsWith(lowerCaseFilterTerm);
        // Check for consecutive characters match using regex
        el.classList.toggle("hidden", shouldToggle);
      });
    }
  }
}
