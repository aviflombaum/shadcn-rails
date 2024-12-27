import { Controller } from "@hotwired/stimulus";

export default class UIFilterMultiple extends Controller {
  static targets = ["source", "item"];

  filter(event) {
    let lowerCaseFilterTerm = this.sourceTarget.value.toLowerCase();
    let regex = new RegExp(`\\b${lowerCaseFilterTerm}`, 'i');

    if (this.hasItemTarget) {
      this.itemTargets.forEach((el) => {
        let filterableKey = el.innerText.toLowerCase();
        el.classList.toggle("hidden", !regex.test(filterableKey));
      });
    }
  }
}
