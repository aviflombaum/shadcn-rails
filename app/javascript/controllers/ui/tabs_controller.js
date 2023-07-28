// https://github.com/excid3/tailwindcss-stimulus-components/blob/master/src/tabs.js
import { Controller } from "@hotwired/stimulus";
import "https://ga.jspm.io/npm:@kanety/stimulus-static-actions@1.0.1/dist/index.modern.js";

export default class extends Controller {
  static targets = ["tab", "panel"];
  static actions = [["tab", "click->change"]];

  connect() {
    this.activeTabClasses = (this.data.get("activeTab") || "active").split(" ");
    this.inactiveTabClasses = (this.data.get("inactiveTab") || "inactive").split(" ");
    if (this.anchor) this.index = this.tabTargets.findIndex((tab) => tab.id === this.anchor);
    // this.showTab();
  }

  change(event) {
    // If target specifies an index, use that
    if (event.currentTarget.dataset.index) {
      this.index = event.currentTarget.dataset.index;

      // If target specifies an id, use that
    } else if (event.currentTarget.dataset.id) {
      this.index = this.tabTargets.findIndex((tab) => tab.id == event.currentTarget.dataset.id);

      // Otherwise, use the index of the current target
    } else {
      this.index = this.tabTargets.indexOf(event.currentTarget);
    }

    window.dispatchEvent(new CustomEvent("tsc:tab-change"));
  }

  showTab() {
    this.tabTargets.forEach((tab, index) => {
      const panel = this.panelTargets[index];

      if (index === this.index) {
        panel.classList.remove("hidden");
        tab.classList.remove(...this.inactiveTabClasses);
        tab.classList.add(...this.activeTabClasses);
        tab.dataset.state = "active";
        panel.dataset.state = "active";

        // Update URL with the tab ID if it has one
        // This will be automatically selected on page load
        // - Breaks any other anchors
        // if (tab.id) {
        //   location.hash = tab.id;
        // }
      } else {
        panel.classList.add("hidden");
        tab.classList.remove(...this.activeTabClasses);
        tab.classList.add(...this.inactiveTabClasses);
        tab.dataset.state = "inactive";
        panel.dataset.state = "inactive";
      }
    });
  }

  get index() {
    return parseInt(this.data.get("index") || 0);
  }

  set index(value) {
    this.data.set("index", value >= 0 ? value : 0);
    this.showTab();
  }

  get anchor() {
    return document.URL.split("#").length > 1 ? document.URL.split("#")[1] : null;
  }
}
